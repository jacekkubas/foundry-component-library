import { Page, Variables } from "../../lib/types";
import { request } from "./client";

export default async function getBrands(): Promise<
  Page["customFields"]["brands"] | null
> {
  const query = `
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

  const variables: Variables = { slug: "home", language: "EN" };
  const data: { page: Page } = await request(query, variables);
  return data.page.customFields.brands;
}
