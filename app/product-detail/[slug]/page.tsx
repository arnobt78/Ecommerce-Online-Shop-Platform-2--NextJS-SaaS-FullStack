import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailLayout } from "@/components/ProductDetailPage/ProductDetailLayout";

export default async function ProductDetailSlugPage({ params }: { params: { slug: string } }) {
  // Await params to comply with Next.js dynamic route requirements
  const { slug } = await Promise.resolve(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  return (
    <div className="mt-20">
      <ProductDetailLayout product={product} />
    </div>
  );
}
