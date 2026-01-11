import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readFileSync } from "fs";
import { join } from "path";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL ?? "";

    if (token && GRAPHQL_ENDPOINT) {
      try {
        const revokeQueryPath = join(
          process.cwd(),
          "src",
          "app",
          "qraphql",
          "mutation",
          "revoke-customer-token.graphql"
        );
        const revokeQuery = readFileSync(revokeQueryPath, "utf8");

        const response = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: revokeQuery }),
        });

        if (response.status === 200) cookieStore.delete("auth-token");
      } catch (e) {
        console.warn("Failed to call revoke-customer-token:", e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("/api/auth/logout error:", err);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
