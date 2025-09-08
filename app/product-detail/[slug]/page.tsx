import { notFound } from "next/navigation";
import { products } from "@/scripts/data/products";
import { ProductDetailLayout } from "@/components/ProductDetailPage/ProductDetailLayout";
import { ProductProvider } from "@/context/ProductContext";
import ErrorBoundary from "@/components/ErrorBoundary";

export default async function ProductDetailSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  // Await params to comply with Next.js dynamic route requirements
  const { slug } = await Promise.resolve(params);
  const product = products.find((p) => p.slug === slug);

  // Server-side logging
  console.log("Server-side product finding:", {
    slug,
    foundProduct: !!product,
    productName: product?.productName,
    totalProducts: products.length,
    timestamp: new Date().toISOString(),
  });

  if (!product) return notFound();

  return (
    <ErrorBoundary>
      <ProductProvider>
        <div className="pt-20 sm:pt-32">
          <ProductDetailLayout product={product} slug={slug} />
        </div>
      </ProductProvider>
    </ErrorBoundary>
  );
}
