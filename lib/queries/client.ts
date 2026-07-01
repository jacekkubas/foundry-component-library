const baseUrl = process.env.WORDPRESS_URL || "https://data.foundry.ch";

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

if (process.env.WP_PREVIEW_USER && process.env.WP_PREVIEW_PASS) {
  const auth = Buffer.from(`admin:${process.env.WP_PREVIEW_PASS}`).toString(
    "base64",
  );
  headers["Authorization"] = `Basic ${auth}`;
}

export async function request<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: 60 * 3,
    },
  } as RequestInit & { next?: { revalidate?: number } });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || "GraphQL error");
  }
  return json.data as T;
}
