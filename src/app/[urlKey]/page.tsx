import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductsList from "@/src/app/components/ProductsList";
import { fetchCatalog, fetchProductsByCategory } from "@/src/app/utils/graphql/fetchers";

interface Category {
  id: number;
  name: string;
  url_key: string | null;
  children?: Category[];
}

function findByUrlKey(list: Category[], urlKey: string): Category | null {
  for (const cat of list) {
    if (cat.url_key === urlKey) return cat;
    if (cat.children?.length) {
      const found = findByUrlKey(cat.children, urlKey);
      if (found) return found;
    }
  }
  return null;
}

async function CategoryData({ urlKey }: { urlKey: string }) {
  const catalog = await fetchCatalog();
  if (!catalog) return notFound();

  const category = findByUrlKey(catalog.categoryList as Category[], urlKey);
  if (!category) return notFound();

  const data = await fetchProductsByCategory(String(category.id));
  const products = (data?.products?.items ?? []) as Parameters<typeof ProductsList>[0]["products"];
  const totalCount = data?.products?.total_count ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductsList
        products={products}
        totalCount={totalCount}
        categoryName={category.name}
      />
    </div>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ urlKey: string }>;
}) {
  const { urlKey } = await params;

  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <CategoryData urlKey={urlKey} />
    </Suspense>
  );
}
