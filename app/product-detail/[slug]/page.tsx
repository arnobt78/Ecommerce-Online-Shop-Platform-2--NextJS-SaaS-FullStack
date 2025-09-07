import { notFound } from "next/navigation";
import { products } from "@/scripts/data/products";
import { ProductDetailLayout } from "@/components/ProductDetailPage/ProductDetailLayout";
import { ProductProvider } from "@/context/ProductContext";

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
    <ProductProvider>
      <div className="pt-20 sm:pt-32">
        <ProductDetailLayout product={product} slug={slug} />
      </div>
    </ProductProvider>
  );
}
