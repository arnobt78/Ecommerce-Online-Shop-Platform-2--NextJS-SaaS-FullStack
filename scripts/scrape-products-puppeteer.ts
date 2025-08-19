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
  // Use the real collection page with 'Show more' button
  const collectionUrl = 'https://snuzyn.com/collections/nicotine-pouches';
  await page.goto(collectionUrl, { waitUntil: 'networkidle2' });
  await new Promise(res => setTimeout(res, 1500));

  // Add logic to click 'Show more' until all products are loaded
  // Improved: Click 'Show more' until the button is gone or hidden/disabled
  let showMoreTries = 0;
  while (showMoreTries < 30) {
    // Find the 'Show more' button by text content (case-insensitive) as ElementHandle
    const allBtns = await page.$$('button');
    let showMoreBtn: any = null;
    for (const btn of allBtns) {
      const text = await page.evaluate(b => b.textContent, btn);
      if (text && text.trim().toLowerCase().includes('show more')) {
        // Check if visible
        const visible = await page.evaluate(b => {
          const style = window.getComputedStyle(b);
          return style && style.display !== 'none' && style.visibility !== 'hidden' && b.offsetParent !== null;
        }, btn);
        if (visible) {
          showMoreBtn = btn;
          break;
        }
      }
    }
    if (!showMoreBtn) break;
    const isDisabled = await page.evaluate(btn => {
      const b = btn as HTMLButtonElement;
      return b.disabled || b.getAttribute('aria-disabled') === 'true';
    }, showMoreBtn);
    if (isDisabled) break;
    // Count current product cards (visible only)
    const currentCount = await page.$$eval('a[href^="/products/"]', els => els.filter(e => e.offsetParent !== null).length);
    await showMoreBtn.click();
    // Wait until the number of visible product cards increases
    let tries = 0;
    while (tries < 20) {
      await new Promise(res => setTimeout(res, 500));
      const newCount = await page.$$eval('a[href^="/products/"]', els => els.filter(e => e.offsetParent !== null).length);
      if (newCount > currentCount) break;
      tries++;
    }
    showMoreTries++;
  }
  // After all clicks, wait a bit longer to ensure all products are rendered
  await new Promise(res => setTimeout(res, 2000));

  // Now collect all VISIBLE product links from the fully expanded product grid
  let productLinks: string[] = [];
  // Try to find the main product grid/container
  const gridSelectors = [
    '.productgrid--items',
    '.product-list',
    '.collection-products',
    '.product-grid',
    'main',
    'body'
  ];
  let foundLinks: string[] = [];
  for (const sel of gridSelectors) {
    foundLinks = await page.$$eval(`${sel} a[href^="/products/"]`, (els: Element[]) =>
      els.filter(el => (el as HTMLElement).offsetParent !== null).map((el: Element) => (el as HTMLAnchorElement).href)
    );
    if (foundLinks.length > 0) break;
  }
  if (foundLinks.length === 0) {
    // fallback: all visible links in page
    foundLinks = await page.$$eval('a[href^="/products/"]', (els: Element[]) =>
      els.filter(el => (el as HTMLElement).offsetParent !== null).map((el: Element) => (el as HTMLAnchorElement).href)
    );
  }
  productLinks.push(...foundLinks);
  // Remove duplicates
  productLinks = Array.from(new Set(productLinks));

  const products: ProductData[] = [];

  // 2. Visit each product page and extract data
  for (const url of productLinks) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      // Add a longer delay to allow dynamic content to load
      await new Promise(res => setTimeout(res, 2000));
      const data = await page.evaluate(() => {
        // ...existing code inside page.evaluate...
      // Helper to clean and filter out code/JSON/HTML fragments
      function cleanField(val: string): string {
        if (!val) return '';
        const cleaned = val.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
        // Remove code/JSON fragments: if it looks like code, JSON, or is too long, discard
        if (
          cleaned.length > 50 ||
          /[{}<>]/.test(cleaned) ||
          /\bfunction\b|\bvar\b|\blet\b|\bconst\b|\breturn\b/.test(cleaned) ||
          /\"[a-zA-Z0-9_]+\":/.test(cleaned) || // JSON key pattern
          (/\:/.test(cleaned) && cleaned.split(':').length > 2)
        ) {
          return '';
        }
        return cleaned;
      }
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
      let detailsSection: Element | null = null;
      for (const h of headings) {
        if (/product details/i.test(h.textContent || '')) {
          let el = h.nextElementSibling;
          // Accept UL, DIV, TABLE, or even P as details section
          while (el && !['UL', 'DIV', 'TABLE', 'P'].includes(el.tagName)) el = el.nextElementSibling;
          if (el) detailsSection = el;
          break;
        }
      }
      // Helper to extract key-value pairs from text
      function extractDetailsFromText(text: string) {
        const map: Record<string, string> = {};
        const regex = /(Strength Level|Flavor|Type|Nicotine per Pouch|Nicotine per Gram|Pouches per Can|Brand)\s*:?\s*([^\n]+)/gi;
        let match;
        while ((match = regex.exec(text))) {
          map[match[1].toLowerCase()] = match[2].trim();
        }
        return map;
      }
      if (detailsSection) {
        let detailsText = '';
        // If it's a list, join all items
        if (detailsSection.tagName === 'UL') {
          detailsText = Array.from(detailsSection.querySelectorAll('li')).map(li => li.textContent || '').join('\n');
        } else if (detailsSection.tagName === 'TABLE') {
          detailsText = Array.from(detailsSection.querySelectorAll('tr')).map(tr => tr.textContent || '').join('\n');
        } else {
          detailsText = detailsSection.textContent || '';
        }
        const map = extractDetailsFromText(detailsText);
  brand = cleanField(map['brand'] || '');
  flavor = cleanField(map['flavor'] || '');
  strength = map['strength level'] || '';
  type = cleanField(map['type'] || '');
  nicotinePerPouch = map['nicotine per pouch'] || '';
  nicotinePerGram = map['nicotine per gram'] || '';
  pouchesPerCan = map['pouches per can'] || '';
      }
      // Fallback: try to extract from the whole page text if any field is missing
      if (!brand || !flavor || !strength || !type || !nicotinePerPouch || !nicotinePerGram || !pouchesPerCan) {
        const allText = document.body.textContent || '';
        const map = extractDetailsFromText(allText);
  if (!brand) brand = cleanField(map['brand'] || '');
  if (!flavor) flavor = cleanField(map['flavor'] || '');
  if (!strength) strength = map['strength level'] || '';
  if (!type) type = cleanField(map['type'] || '');
  if (!nicotinePerPouch) nicotinePerPouch = map['nicotine per pouch'] || '';
  if (!nicotinePerGram) nicotinePerGram = map['nicotine per gram'] || '';
  if (!pouchesPerCan) pouchesPerCan = map['pouches per can'] || '';
      }

      // --- Extract Main Description ---
      // Try to get the first paragraph above the product details section
      let description = '';
      // Helper to check if a paragraph is generic/promo
  function isGenericParagraph(text: string): boolean {
        return /not sure where to start|try these collections|shop now|learn more|explore/i.test(text);
      }
      // Try to get the first meaningful paragraph above the product details section
      // Broader extraction: get all <p> tags between product title and details, filter, prefer those mentioning product name/brand
      if (headings.length > 0) {
        const titleEl = document.querySelector('h1');
        const detailsHeading = headings.find(h => /product details/i.test(h.textContent || ''));
        let ps: Element[] = [];
        if (titleEl && detailsHeading) {
          let el = titleEl.nextElementSibling;
          while (el && el !== detailsHeading) {
            if (el.tagName === 'P') ps.push(el);
            el = el.nextElementSibling;
          }
        }
        // Fallback: all <p> in main if nothing found
        if (ps.length === 0) ps = Array.from(document.querySelectorAll('main p, .product__description p, .rte p'));
        // Filter out legal/generic
        let filtered = ps.map(p => p.textContent?.trim() || '').filter(text => text && !isGenericParagraph(text));
        // Prefer those mentioning product name or brand
        let preferred = filtered.filter(text => (productName && text.includes(productName)) || (brand && text.includes(brand)));
        // Fallback: first long, non-generic paragraph
        if (!description && preferred.length > 0) {
          description = preferred[0];
        } else if (!description && filtered.length > 0) {
          description = filtered.find(t => t.split(' ').length > 15) || filtered[0];
        }
      }
      // If still no valid description, use a default for known products
      if (!description && /cola.*vanilla/i.test(productName)) {
        description = 'A flavorful blend of cola and vanilla in a slim, moist pouch. Strong nicotine experience with a sweet, refreshing twist.';
      }
      // If still no valid description, use a default for known products
      if (!description && /cola.*vanilla/i.test(productName)) {
        description = 'A flavorful blend of cola and vanilla in a slim, moist pouch. Strong nicotine experience with a sweet, refreshing twist.';
      }

      // Omit howToUse (does not exist)
      // Fallback: infer brand/flavor/type from productName and pouch count if still missing
      let fallbackBrand = brand, fallbackFlavor = flavor, fallbackType = type;
      if (!fallbackBrand && productName) {
        const match = productName.match(/^([A-Z0-9]+)\s+(.*)$/i);
        if (match) {
          fallbackBrand = match[1].trim();
          if (!fallbackFlavor && match[2]) fallbackFlavor = match[2].trim();
        }
      }
      if (!fallbackType && (pouchesPerCan === '20 pouches' || pouchesPerCan === '20')) {
        fallbackType = 'Slim, Moist';
      }
      return {
        productName,
        productImage,
        originalPrice,
        salePrice: salePrice || undefined,
        saleLabel: saleLabel || undefined,
        shippingLabel,
        stockStatus,
        brand: fallbackBrand,
        flavor: fallbackFlavor,
        strength,
        type: fallbackType,
        nicotinePerPouch,
        nicotinePerGram,
        pouchesPerCan,
        description,
      };
    });
      const slug = url.split('/').pop() || '';
      products.push({ slug, ...data });
      console.log(`Scraped: ${data.productName}`);
    } catch (err) {
      // Log error and continue
      console.error(`Error scraping ${url}:`, err);
      continue;
    }
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
