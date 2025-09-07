import { ProductData } from "@/scripts/data/products";

// Server-side product selection and shuffling
export function getRelatedProducts(
  currentProduct: ProductData,
  products: ProductData[]
): ProductData[] {
  if (!currentProduct) return [];
  // Filter related products by productName, brand, or flavor
  let relatedProducts: ProductData[] = products.filter(
    (p) =>
      p.slug !== currentProduct.slug &&
      ((currentProduct.productName &&
        p.productName &&
        p.productName
          .toLowerCase()
          .includes(currentProduct.productName.toLowerCase())) ||
        (currentProduct.brand &&
          p.brand &&
          p.brand.toLowerCase() === currentProduct.brand.toLowerCase()) ||
        (currentProduct.flavor &&
          p.flavor &&
          p.flavor.toLowerCase() === currentProduct.flavor.toLowerCase()))
  );
  // Always fill the reel: related products first, then random others (excluding current and already shown)
  const alreadyShownSlugs = new Set<string>([
    ...relatedProducts.map((p) => p.slug),
    currentProduct.slug,
  ]);
  let restProducts = products.filter((p) => !alreadyShownSlugs.has(p.slug));
  // Shuffle restProducts for randomness
  for (let i = restProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [restProducts[i], restProducts[j]] = [restProducts[j], restProducts[i]];
  }
  // Combine related + random others
  return [...relatedProducts, ...restProducts];
}
