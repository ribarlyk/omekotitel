import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readFileSync } from "fs";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL ?? "";
    
    if (!GRAPHQL_ENDPOINT) {
      console.error("GRAPHQL_URL is not configured");
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const genQueryPath = join(
      process.cwd(),
      "src",
      "app",
      "qraphql",
      "mutation",
      "generate-customer-token.graphql"
    );
    const genQuery = readFileSync(genQueryPath, "utf8");

    const genResp = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: genQuery, variables: { email, password } }),
    });

    if (!genResp.ok) {
      console.error(
        "GraphQL HTTP error during token generation",
        genResp.status
      );
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    const genData = await genResp.json();
    if (genData.errors || !genData?.data?.generateCustomerToken?.token) {
      console.error("GraphQL token errors:", genData.errors ?? genData);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = genData.data.generateCustomerToken.token;

    const cookieStore = await cookies();

    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // Create an empty cart for the signed-in customer (server-side)
    let cartId: string | null = null;
    try {
      const cartQueryPath = join(
        process.cwd(),
        "src",
        "app",
        "qraphql",
        "mutation",
        "create-cart-after-signin.graphql"
      );
      const cartQuery = readFileSync(cartQueryPath, "utf8");

      const cartResp = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: cartQuery }),
      });

      if (cartResp.ok) {
        const cartData = await cartResp.json();
        cartId = cartData?.data?.cartId ?? null;
      } else {
        console.warn("Cart creation HTTP error", cartResp.status);
      }
    } catch (err) {
      console.warn("Failed to create cart after sign-in:", err);
    }

    return NextResponse.json({ success: true, cartId });
  } catch (error) {
    console.error("/api/login error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
