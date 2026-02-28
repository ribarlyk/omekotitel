import ProductDetail from "@/src/app/components/ProductDetail";
import { Suspense } from "react";

async function ProductData({ urlKey }: { urlKey: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/product/${urlKey}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  const data = await response.json();
  const product = data.products?.items?.[0];

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return <ProductDetail product={product} />;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ urlKey: string }>;
}) {
  const { urlKey } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductData urlKey={urlKey} />
    </Suspense>
  );
}
