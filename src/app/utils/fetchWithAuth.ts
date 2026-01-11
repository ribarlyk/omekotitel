import { cookies } from "next/headers";

type FetchWithAuthOpts = {
  query?: string;
  variables?: string | Record<string, string>;
  body?: string | null;
  method?: string;
  headers?: Record<string, string>;
  fetchOptions?: RequestInit;
};

export async function fetchWithAuth(opts: FetchWithAuthOpts) {
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL ?? "";
  if (!GRAPHQL_ENDPOINT) {
    throw new Error("GRAPHQL_URL is not configured");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers ?? {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const body =
    opts.body ??
    (opts.query
      ? JSON.stringify({ query: opts.query, variables: opts.variables })
      : undefined);

  const resp = await fetch(GRAPHQL_ENDPOINT, {
    method: opts.method ?? "POST",
    headers,
    body,
    ...opts.fetchOptions,
  });

  const text = await resp.text();
  const contentType = resp.headers.get("content-type") ?? "application/json";

  return new Response(text, {
    status: resp.status,
    headers: { "Content-Type": contentType },
  });
}
