import ProductDetail from "@/src/app/components/ProductDetail";
import { Suspense } from "react";
import { fetchProductDetail } from "@/src/app/utils/graphql/fetchers";

async function ProductData({ urlKey }: { urlKey: string }) {
  const data = await fetchProductDetail(urlKey);
  const product = data?.products?.items?.[0] as Parameters<typeof ProductDetail>[0]["product"] | undefined;

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
