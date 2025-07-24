

import { Suspense } from "react";
import { ProductDetailLayout } from "@/components/ProductDetailPage/ProductDetailLayout";

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex items-center justify-center w-full bg-white"
          style={{ color: '#111', fontSize: 22, fontWeight: 600, textAlign: 'center' }}
        >
          Loading product details...
        </div>
      }
    >
      <div className="mt-20">
      <ProductDetailLayout />
      </div>

    </Suspense>
  );
}
