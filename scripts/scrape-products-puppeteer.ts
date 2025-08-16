// scripts/scrape-products-puppeteer.ts

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export type StockStatus = 'in_stock' | 'low_stock' | 'last_3' | 'no_stock';

interface ProductData {
  slug: string;
  productImage: string;
  productName: string;
  salePrice?: string;
  originalPrice: string;
  saleLabel?: string;
  shippingLabel: string;
  stockStatus: StockStatus;
  brand: string;
  flavor: string;
  strength: string;
  type: string;
  nicotinePerPouch: string;
  nicotinePerGram: string;
  pouchesPerCan: string;
  description?: string;
}

async function scrape() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const baseUrl = 'https://snuzyn.com/collections/all';
  let productLinks: string[] = [];
  let currentPage = 1;
  let hasNextPage = true;
  while (hasNextPage) {
    const url = `${baseUrl}?page=${currentPage}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(res => setTimeout(res, 1000));
    const links = await page.$$eval('a[href^="/products/"]', (els: Element[]) =>
      els.map((el: Element) => (el as HTMLAnchorElement).href)
    );
    productLinks.push(...links);
    // Remove duplicates
    productLinks = Array.from(new Set(productLinks));
    // Check if there is a next page button
    hasNextPage = await page.$('a[rel="next"]') !== null;
    currentPage++;
  }

  const products: ProductData[] = [];

  // 2. Visit each product page and extract data
  for (const url of productLinks) {
  await page.goto(url, { waitUntil: 'networkidle2' });
  await new Promise(res => setTimeout(res, 1000));
    const data = await page.evaluate(() => {
      const getText = (selector: string) => {
        const el = document.querySelector(selector);
        return el ? el.textContent?.trim() || '' : '';
      };
      // Extract main fields
      const productName = getText('h1');
      // Robust product image extraction
      let productImage = '';
      // Try several selectors for the main product image
      let imgEl = document.querySelector('.product__media-item img');
      if (!imgEl) imgEl = document.querySelector('.product__media img');
      if (!imgEl) imgEl = document.querySelector('main img');
      if (imgEl) {
        let src = imgEl.getAttribute('src') || imgEl.getAttribute('data-src') || '';
        // If lazy loaded, try srcset
        if (!src) {
          const srcset = imgEl.getAttribute('srcset');
          if (srcset) {
            src = srcset.split(',')[0].trim().split(' ')[0];
          }
        }
        if (src.startsWith('//')) src = 'https:' + src;
        if (src.startsWith('/')) src = 'https://snuzyn.com' + src;
        productImage = src;
      }
      const originalPrice = getText('.price-item--regular, .product__price');
      const salePrice = getText('.price-item--sale');
      const saleLabel = getText('.badge--sale');
      const shippingLabel = 'Free shipping on 10+ cans';
      let stockStatus: StockStatus = 'no_stock';
      const pageText = document.body.textContent?.toLowerCase() || '';
      if (pageText.includes('in stock')) stockStatus = 'in_stock';
      else if (pageText.includes('low stock')) stockStatus = 'low_stock';
      else if (pageText.includes('last 3')) stockStatus = 'last_3';
      else if (pageText.includes('out of stock') || pageText.includes('sold out')) stockStatus = 'no_stock';

      // --- Extract Product Details ---
      let brand = '', flavor = '', strength = '', type = '', nicotinePerPouch = '', nicotinePerGram = '', pouchesPerCan = '';
      // Find the "Product details" heading
      const headings = Array.from(document.querySelectorAll('h2, h3, h4, strong, b'));
      let detailsList = null;
      for (const h of headings) {
        if (/product details/i.test(h.textContent || '')) {
          let el = h.nextElementSibling;
          while (el && !(el.tagName === 'UL' || el.tagName === 'DIV')) el = el.nextElementSibling;
          if (el) detailsList = el;
          break;
        }
      }
      if (detailsList) {
        // Look for list items with <strong>Label:</strong> Value
        const items = Array.from(detailsList.querySelectorAll('li'));
        for (const item of items) {
          let label = '', value = '';
          const strong = item.querySelector('strong');
          if (strong) {
            label = strong.textContent?.replace(':', '').trim().toLowerCase() || '';
            // Value is the text after <strong> (may be a text node or element)
            let node = strong.nextSibling;
            while (node && node.nodeType !== 3) node = node.nextSibling; // 3 = TEXT_NODE
            value = node && node.textContent ? node.textContent.trim() : '';
            if (!value) {
              // fallback: remove label from item.textContent
              value = item.textContent?.replace(strong.textContent || '', '').replace(':', '').trim() || '';
            }
          }
          if (label === 'brand') brand = value;
          if (label === 'flavor') flavor = value;
          if (label === 'strength level') strength = value;
          if (label === 'type') type = value;
          if (label === 'nicotine per pouch') nicotinePerPouch = value;
          if (label === 'nicotine per gram') nicotinePerGram = value;
          if (label === 'pouches per can') pouchesPerCan = value;
        }
      }

      // --- Extract Main Description ---
      // Try to get the first paragraph above the product details section
      let description = '';
      if (headings.length > 0) {
        const detailsHeading = headings.find(h => /product details/i.test(h.textContent || ''));
        if (detailsHeading) {
          // Look for previous sibling paragraphs
          let prev = detailsHeading.previousElementSibling;
          while (prev) {
            if (prev.tagName === 'P') {
              description = prev.textContent?.trim() || '';
              break;
            }
            prev = prev.previousElementSibling;
          }
        }
      }
      // Fallback: use the first paragraph in the main content
      if (!description) {
        const p = document.querySelector('main p, .product__description p, .rte p');
        if (p) description = p.textContent?.trim() || '';
      }

      // Omit howToUse (does not exist)
      return {
        productName,
        productImage,
        originalPrice,
        salePrice: salePrice || undefined,
        saleLabel: saleLabel || undefined,
        shippingLabel,
        stockStatus,
        brand,
        flavor,
        strength,
        type,
        nicotinePerPouch,
        nicotinePerGram,
        pouchesPerCan,
        description,
      };
    });
    const slug = url.split('/').pop() || '';
    products.push({ slug, ...data });
    console.log(`Scraped: ${data.productName}`);
  }

  await browser.close();

  // 3. Write to products.ts
  const outDir = path.join(__dirname, '../data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'products.ts');
  fs.writeFileSync(
    outPath,
    `// AUTO-GENERATED FILE\n\nexport type StockStatus = 'in_stock' | 'low_stock' | 'last_3' | 'no_stock';\n\nexport interface ProductData {\n  slug: string;\n  productImage: string;\n  productName: string;\n  salePrice?: string;\n  originalPrice: string;\n  saleLabel?: string;\n  shippingLabel: string;\n  stockStatus: StockStatus;\n  brand: string;\n  flavor: string;\n  strength: string;\n  type: string;\n  nicotinePerPouch: string;\n  nicotinePerGram: string;\n  pouchesPerCan: string;\n  description?: string;\n}\n\nexport const products: ProductData[] = ${JSON.stringify(products, null, 2)};\n`
  );
  console.log(`Scraped ${products.length} products.`);
}

scrape();
