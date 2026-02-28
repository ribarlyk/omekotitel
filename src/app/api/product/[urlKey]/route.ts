import { NextRequest, NextResponse } from "next/server";
import { Queries } from "@/src/app/utils/graphql";
import { print } from "graphql";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ urlKey: string }> }
) {
  try {
    const { urlKey } = await params;

    if (!urlKey) {
      return NextResponse.json(
        { error: "urlKey is required" },
        { status: 400 },
      );
    }

    const query = print(Queries.GET_PRODUCT_DETAIL);

    const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL ?? "";

    if (!GRAPHQL_ENDPOINT) {
      return NextResponse.json(
        { error: "GRAPHQL_URL is not configured" },
        { status: 500 },
      );
    }

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          urlKey,
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return NextResponse.json(
        { error: "GraphQL query failed", details: data.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Product detail API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 },
    );
  }
}
