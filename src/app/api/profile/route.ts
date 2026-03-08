import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Queries } from "@/src/app/utils/graphql";
import { print } from "graphql";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL ?? "";

    const resp = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: print(Queries.GET_CUSTOMER) }),
    });

    const data = await resp.json();

    if (data.errors || !data?.data?.customer) {
      return NextResponse.json({ error: "Failed to fetch customer" }, { status: 400 });
    }

    return NextResponse.json(data.data.customer);
  } catch (error) {
    console.error("/api/profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
