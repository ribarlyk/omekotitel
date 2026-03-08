import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Queries } from "@/src/app/utils/graphql";
import { print } from "graphql";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL ?? "";

export async function GET() {
  try {
    if (!GRAPHQL_ENDPOINT) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return NextResponse.json({ wishlist: null }, { status: 401 });
    }

    const query = print(Queries.GET_CUSTOMER_WISHLIST);

    const resp = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!resp.ok) {
      console.error("Magento wishlist HTTP error:", resp.status);
      return NextResponse.json({ wishlist: null });
    }

    const data = await resp.json();

    if (data.errors) {
      console.error("GraphQL wishlist errors:", JSON.stringify(data.errors));
      // Return empty wishlist rather than 500 — wishlist may not be enabled
      return NextResponse.json({ wishlist: null });
    }

    const wishlist = data.data?.customer?.wishlist ?? null;

    return NextResponse.json({ wishlist });
  } catch (error) {
    console.error("/api/wishlist GET error:", error);
    return NextResponse.json({ wishlist: null });
  }
}
