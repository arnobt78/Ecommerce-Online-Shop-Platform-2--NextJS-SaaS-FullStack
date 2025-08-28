import { notFound } from "next/navigation";
import { products } from "@/scripts/data/products";
import { ProductDetailLayout } from "@/components/ProductDetailPage/ProductDetailLayout";

export default async function ProductDetailSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  // Await params to comply with Next.js dynamic route requirements
  const { slug } = await Promise.resolve(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  return (
    <div className="pt-4 sm:pt-20">
      <ProductDetailLayout product={product} slug={slug} />
    </div>
  );
}
