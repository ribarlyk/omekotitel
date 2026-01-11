import { Suspense } from "react";
import { ProductsSection } from "./ProductsSection";
import { ProductsSkeleton } from "./ProductsSkeleton";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Bestseller Products</h1>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsSection />
      </Suspense>
    </div>
  );
}
