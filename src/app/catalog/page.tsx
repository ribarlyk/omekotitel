import Catalog from "@/src/app/components/CatalogTree/index";
import { Suspense } from "react";

async function CatalogData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/catalog`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return <div>Failed to load catalog</div>;
  }

  const catalog = await response.json();
  return <Catalog catalog={catalog} />;
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogData />
    </Suspense>
  );
}
