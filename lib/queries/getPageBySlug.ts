import { gql } from "graphql-request";
import { Page } from "../../lib/types";
import client from "./client";

export default async function getPageBySlug(
  slug: string
): Promise<Page | null> {
  const query = gql`
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
      }
    }
  `;

  const variables = { slug };
  const data: { page: Page } = await client.request(query, variables);
  return data.page;
}
