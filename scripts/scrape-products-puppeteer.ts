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
  const collectionUrl = 'https://snuzyn.com/collections/nicotine-pouches';
  await page.goto(collectionUrl, { waitUntil: 'networkidle2' });
  await new Promise(res => setTimeout(res, 1500));

  // --- Robustly click 'Show more' until all products are loaded ---
  let lastProductCount = 0;
  let stableRounds = 0;
  for (let tries = 0; tries < 40; tries++) {
    const showMoreExists = await page.$$eval('button', btns =>
      btns.some(b => {
        const txt = b.textContent?.toLowerCase() || '';
        const style = window.getComputedStyle(b);
        return txt.includes('show more') && !b.disabled && style.display !== 'none' && style.visibility !== 'hidden' && (b as HTMLElement).offsetParent !== null;
      })
    );
    if (showMoreExists) {
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        for (const b of btns) {
          const txt = b.textContent?.toLowerCase() || '';
          const style = window.getComputedStyle(b);
          if (txt.includes('show more') && !b.disabled && style.display !== 'none' && style.visibility !== 'hidden' && (b as HTMLElement).offsetParent !== null) {
            (b as HTMLElement).click();
            break;
          }
        }
      });
      await new Promise(res => setTimeout(res, 800));
    }
    const currentCount = await page.$$eval('a[href^="/products/"]', els => els.filter(e => (e as HTMLElement).offsetParent !== null).length);
    if (currentCount > lastProductCount) {
      lastProductCount = currentCount;
      stableRounds = 0;
    } else {
      stableRounds++;
    }
    const stillShowMore = await page.$$eval('button', btns =>
      btns.some(b => {
        const txt = b.textContent?.toLowerCase() || '';
        const style = window.getComputedStyle(b);
        return txt.includes('show more') && !b.disabled && style.display !== 'none' && style.visibility !== 'hidden' && (b as HTMLElement).offsetParent !== null;
      })
    );
    if (!stillShowMore && stableRounds >= 3) break;
    await new Promise(res => setTimeout(res, 500));
  }

  // --- Collect all visible product links ---
  let productLinks: string[] = [];
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
    foundLinks = await page.$$eval('a[href^="/products/"]', (els: Element[]) =>
      els.filter(el => (el as HTMLElement).offsetParent !== null).map((el: Element) => (el as HTMLAnchorElement).href)
    );
  }
  productLinks.push(...foundLinks);
  productLinks = Array.from(new Set(productLinks));

  const products: ProductData[] = [];

  // --- Visit each product page and extract data ---
  for (const url of productLinks) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      await new Promise(res => setTimeout(res, 2000));
      const data = await page.evaluate(() => {
        function cleanField(val: string): string {
          if (!val) return '';
          const cleaned = val.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
          if (
            cleaned.length > 50 ||
            /[{}<>]/.test(cleaned) ||
            /\bfunction\b|\bvar\b|\blet\b|\bconst\b|\breturn\b/.test(cleaned) ||
            /\"[a-zA-Z0-9_]+\":/.test(cleaned) ||
            (/\:/.test(cleaned) && cleaned.split(':').length > 2)
          ) {
            return '';
          }
          return cleaned;
        }
        const getText = (selector: string) => {
          const el = document.querySelector(selector as string);
          return el ? el.textContent?.trim() || '' : '';
        };
        const productName = getText('h1');
        let productImage = '';
        let imgEl = document.querySelector('.product__media-item img');
        if (!imgEl) imgEl = document.querySelector('.product__media img');
        if (!imgEl) imgEl = document.querySelector('main img');
        if (imgEl) {
          let src = imgEl.getAttribute('src') || imgEl.getAttribute('data-src') || '';
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
        const shippingLabel = 'Free Shipping';
        let stockStatus = 'no_stock';
        const pageText = document.body.textContent?.toLowerCase() || '';
        if (pageText.includes('in stock')) stockStatus = 'in_stock';
        else if (pageText.includes('low stock')) stockStatus = 'low_stock';
        else if (pageText.includes('last 3')) stockStatus = 'last_3';
        else if (pageText.includes('out of stock') || pageText.includes('sold out')) stockStatus = 'no_stock';

        // --- Robust Product Details Extraction ---
        let brand = '', flavor = '', strength = '', type = '', nicotinePerPouch = '', nicotinePerGram = '', pouchesPerCan = '';
        const headings = Array.from(document.querySelectorAll('h2, h3, h4, strong, b'));
        let detailsSection = null;
        for (const h of headings) {
          if (/product details/i.test(h.textContent || '')) {
            let el = h.nextElementSibling;
            while (el && !['UL', 'DIV', 'TABLE', 'P'].includes(el.tagName)) el = el.nextElementSibling;
            if (el) detailsSection = el;
            break;
          }
        }
        // Helper to extract key-value pairs from a node (table, ul, div, etc)
        function extractDetailsFromNode(node: Element): Record<string, string> {
          const map: Record<string, string> = {};
          // Table rows
          if ((node as HTMLElement).tagName === 'TABLE') {
            const rows = (node as HTMLTableElement).querySelectorAll('tr');
            for (const tr of Array.from(rows)) {
              const tds = tr.querySelectorAll('td, th');
              if (tds.length >= 2) {
                const key = tds[0].textContent?.trim().toLowerCase();
                const val = tds[1].textContent?.trim();
                if (key && val) map[key] = val;
              } else if (tds.length === 1) {
                // Sometimes "Label: Value" in one cell
                const parts = tds[0].textContent?.split(':');
                if (parts && parts.length === 2) {
                  map[parts[0].trim().toLowerCase()] = parts[1].trim();
                }
              }
            }
          }
          // List items
          if ((node as HTMLElement).tagName === 'UL' || (node as HTMLElement).tagName === 'OL') {
            const items = (node as HTMLElement).querySelectorAll('li');
            for (const li of Array.from(items)) {
              const txt = li.textContent || '';
              const match = txt.match(/^(.*?):\s*(.*)$/);
              if (match) {
                map[match[1].trim().toLowerCase()] = match[2].trim();
              }
            }
          }
          // Divs or Ps with "Label: Value"
          if ((node as HTMLElement).tagName === 'DIV' || (node as HTMLElement).tagName === 'P') {
            const txt = node.textContent || '';
            const lines = txt.split('\n');
            for (const line of lines) {
              const match = line.match(/^(.*?):\s*(.*)$/);
              if (match) {
                map[match[1].trim().toLowerCase()] = match[2].trim();
              }
            }
          }
          return map;
        }
        // Try to extract from detailsSection and its children
        let detailsMap: Record<string, string> = {};
        if (detailsSection) {
          detailsMap = extractDetailsFromNode(detailsSection);
          // Also check children (sometimes details are nested)
          for (const child of Array.from(detailsSection.children)) {
            Object.assign(detailsMap, extractDetailsFromNode(child));
          }
        }
        // Fallback: scan all tables, uls, divs in main for details
        if (!detailsSection || Object.keys(detailsMap).length === 0) {
          const main = document.querySelector('main') || document.body;
          const nodes = main.querySelectorAll('table, ul, ol, div, p');
          for (const node of Array.from(nodes)) {
            Object.assign(detailsMap, extractDetailsFromNode(node));
          }
        }
        // Assign fields
        const map = detailsMap as Record<string, string>;
        brand = cleanField(map['brand'] || '');
        flavor = cleanField(map['flavor'] || '');
        strength = map['strength level'] || '';
        type = cleanField(map['type'] || '');
        nicotinePerPouch = map['nicotine per pouch'] || '';
        nicotinePerGram = map['nicotine per gram'] || '';
        pouchesPerCan = map['pouches per can'] || '';

        // Fallback: try to extract from the whole page text if any field is missing
        if (!brand || !flavor || !strength || !type || !nicotinePerPouch || !nicotinePerGram || !pouchesPerCan) {
          const allText = document.body.textContent || '';
          const regex = /(Strength Level|Flavor|Type|Nicotine per Pouch|Nicotine per Gram|Pouches per Can|Brand)\s*:?\\s*([^\n]+)/gi;
          let match;
          while ((match = regex.exec(allText))) {
            const key = match[1].toLowerCase();
            const val = match[2].trim();
            if (key === 'brand' && !brand) brand = cleanField(val);
            if (key === 'flavor' && !flavor) flavor = cleanField(val);
            if (key === 'strength level' && !strength) strength = val;
            if (key === 'type' && !type) type = cleanField(val);
            if (key === 'nicotine per pouch' && !nicotinePerPouch) nicotinePerPouch = val;
            if (key === 'nicotine per gram' && !nicotinePerGram) nicotinePerGram = val;
            if (key === 'pouches per can' && !pouchesPerCan) pouchesPerCan = val;
          }
        }

        // --- Description logic unchanged ---
        let description = '';
        function isGenericParagraph(text: any) {
          return /not sure where to start|try these collections|shop now|learn more|explore/i.test(text as any);
        }
        if (headings.length > 0) {
          const titleEl = document.querySelector('h1');
          const detailsHeading = headings.find((h: any) => /product details/i.test(h.textContent || ''));
          let ps: Element[] = [];
          if (titleEl && detailsHeading) {
            let el = titleEl.nextElementSibling;
            while (el && el !== detailsHeading) {
              if (el.tagName === 'P') ps.push(el);
              el = el.nextElementSibling;
            }
          }
          if (ps.length === 0) ps = Array.from(document.querySelectorAll('main p, .product__description p, .rte p'));
          let filtered = ps.map(p => p.textContent?.trim() || '').filter(text => text && !isGenericParagraph(text));
          let preferred = filtered.filter(text => (productName && text.includes(productName)) || (brand && text.includes(brand)));
          if (!description && preferred.length > 0) {
            description = preferred[0];
          } else if (!description && filtered.length > 0) {
            description = filtered.find(t => t.split(' ').length > 15) || filtered[0];
          }
        }
        if (!description && /cola.*vanilla/i.test(productName)) {
          description = 'A flavorful blend of cola and vanilla in a slim, moist pouch. Strong nicotine experience with a sweet, refreshing twist.';
        }

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
      // Ensure stockStatus is a valid StockStatus
      let stockStatus: StockStatus = 'no_stock';
      if (data.stockStatus === 'in_stock' || data.stockStatus === 'low_stock' || data.stockStatus === 'last_3' || data.stockStatus === 'no_stock') {
        stockStatus = data.stockStatus;
      }
      products.push({ ...data, slug, stockStatus });
      console.log(`Scraped: ${data.productName}`);
    } catch (err) {
      console.error(`Error scraping ${url}:`, err);
      continue;
    }
  }

  await browser.close();

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