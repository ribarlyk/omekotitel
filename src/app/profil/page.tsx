import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Queries } from "@/src/app/utils/graphql";
import { print } from "graphql";
import { ProfileLayout } from "@/src/app/components/Profile/Layout";

interface Customer {
  firstname: string;
  lastname: string;
  email: string;
}

async function getCustomer(): Promise<Customer | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) return null;

  const resp = await fetch(process.env.GRAPHQL_URL ?? "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: print(Queries.GET_CUSTOMER) }),
    cache: "no-store",
  });

  const data = await resp.json();
  return data?.data?.customer ?? null;
}

export default async function ProfilPage() {
  const customer = await getCustomer();
  if (!customer) redirect("/");
  return (
    <Suspense>
      <ProfileLayout customer={customer} />
    </Suspense>
  );
}
