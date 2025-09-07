import ProductPageClient from "@/components/ProductPage/ProductPageClient";
import { products, ProductData } from "@/scripts/data/products";

export default function ProductsPage() {
  // SSG: pass static products to client component
  return <ProductPageClient products={products as ProductData[]} />;
}
