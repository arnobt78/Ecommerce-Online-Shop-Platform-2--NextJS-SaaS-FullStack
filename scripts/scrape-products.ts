import axios from 'axios';
import { load } from 'cheerio';
const fs = require('fs');
const path = require('path');

// Local StockStatus type for standalone script compatibility
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
  nicotinePerPouch: string;
  description?: string;
  howToUse?: string;
}

async function scrape() {
  const collectionUrl = 'https://snuzyn.com/collections/all';
  const { data } = await axios.get(collectionUrl);
  const $ = load(data);

  // 1. Get all product URLs
  const productLinks = Array.from(
    new Set(
      $('a[href^="/products/"]')
        .map((_: any, el: any) => `https://snuzyn.com${el.attribs['href']}`)
        .get()
    )
  );

  const products: ProductData[] = [];

  // 2. Visit each product page
  for (const url of productLinks as string[]) {
    const resp = await axios.get(url);
    const $$ = load(resp.data);

    const slug = url.split('/').pop() || '';
    const productName = $$('h1').first().text().trim();
    const productImage = $$('img.product__media-image').attr('src') || '';
    const originalPrice = $$('span.price').first().text().trim();
    const salePrice = $$('span.price--sale').text().trim() || undefined;
    const saleLabel = $$('span.badge--sale').text().trim() || undefined;
    const shippingLabel = 'Free Shipping'; // or scrape from site
    // Detect stock status from product page text
    let stockStatus: StockStatus = 'no_stock';
    const pageText = resp.data.toLowerCase();
    if (pageText.includes('in stock')) {
      stockStatus = 'in_stock';
    } else if (pageText.includes('low stock')) {
      stockStatus = 'low_stock';
    } else if (pageText.includes('last 3')) {
      stockStatus = 'last_3';
    } else if (pageText.includes('out of stock') || pageText.includes('sold out')) {
      stockStatus = 'no_stock';
    }
    const brand = $$('div.product__vendor').text().trim() || '';
    const flavor = '';
    const strength = '';
    const nicotinePerPouch = '';
    const description = $$('div.product__description').text().trim();
    const howToUse = '';

    products.push({
      slug,
      productImage,
      productName,
      salePrice,
      originalPrice,
      saleLabel,
      shippingLabel,
      stockStatus,
      brand,
      flavor,
      strength,
      nicotinePerPouch,
      description,
      howToUse,
    });
  }

  // 3. Write to products.ts
  const outDir = path.join(__dirname, '../data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'products.ts');
  fs.writeFileSync(
    outPath,
    `// AUTO-GENERATED FILE\nimport type { StockStatus } from "../components/ProductCard/SingleProductCard";\n\nexport interface ProductData {\n  slug: string;\n  productImage: string;\n  productName: string;\n  salePrice?: string;\n  originalPrice: string;\n  saleLabel?: string;\n  shippingLabel: string;\n  stockStatus: StockStatus;\n  brand: string;\n  flavor: string;\n  strength: string;\n  nicotinePerPouch: string;\n  description?: string;\n  howToUse?: string;\n}\n\nexport const products: ProductData[] = ${JSON.stringify(products, null, 2)};\n`
  );
  console.log(`Scraped ${products.length} products.`);
}

scrape();
