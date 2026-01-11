import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuth } from "@/src/app/utils/fetchWithAuth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, variables } = body;

    const resp = await fetchWithAuth({ query, variables });

    const text = await resp.text();
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: resp.status });
    } catch (err) {
      console.error("/api/graphql proxy error:", err);

      return new NextResponse(text, {
        status: resp.status,
        headers: {
          "Content-Type": resp.headers.get("content-type") ?? "text/plain",
        },
      });
    }
  } catch (err) {
    console.error("/api/graphql proxy error:", err);
    return NextResponse.json({ error: "Proxy failed" }, { status: 500 });
  }
}
