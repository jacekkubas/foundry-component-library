import { gql } from "graphql-request";
import { Page } from "../../lib/types";
import client from "./client";

export default async function getBrands(): Promise<
  Page["customFields"]["brands"] | null
> {
  const query = gql`
    query GetBrands($slug: ID!) {
      page(id: $slug, idType: URI) {
        customFields {
          brands {
            title
            image {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const variables = { slug: "home", language: "EN" };
  const data: { page: Page } = await client.request(query, variables);
  return data.page.customFields.brands;
}
