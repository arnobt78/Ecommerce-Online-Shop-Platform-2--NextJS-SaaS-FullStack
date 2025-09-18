import { products } from "@/scripts/data/products";
import { ProductDetailLayout } from "@/components/ProductDetailPage/ProductDetailLayout";
import { ProductProvider } from "@/context/ProductContext";

export default async function ProductDetailSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  // Restore product image and title only
  const { slug } = await Promise.resolve(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h1>Product not found</h1>
      </div>
    );
  }
  return (
    <ProductProvider>
      <ProductDetailLayout product={product} slug={slug} />
    </ProductProvider>
  );
}
