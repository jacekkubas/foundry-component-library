import { GraphQLClient } from "graphql-request";

const baseUrl = process.env.WORDPRESS_URL || "https://data.foundry.ch";

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

if (process.env.WP_PREVIEW_USER && process.env.WP_PREVIEW_PASS) {
  const auth = Buffer.from(`admin:${process.env.WP_PREVIEW_PASS}`).toString(
    "base64"
  );
  headers["Authorization"] = `Basic ${auth}`;
}

const graphqlClient = new GraphQLClient(`${baseUrl}/graphql`, {
  headers,
});

export default graphqlClient;
