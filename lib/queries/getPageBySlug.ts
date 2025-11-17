import { gql } from "graphql-request";
import { Page } from "../../lib/types";
import client from "./client";
import { ContactPage } from "./getContactPage";

export default async function getPageBySlug(
  slug: string,
  language: string
): Promise<{ page: Page; contactPage: ContactPage }> {
  const contactPage = language === "DE" ? "contact-de" : "contact";

  const query = gql`
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
      }
      contactPage: page(id: "${contactPage}", idType: URI) {
        customFieldsContact {
          facebook
          instagram
          linkedin
          berlinImage {
            sourceUrl
          }
          berlinText
          berlinEmail
          berlinPhone
          zurichImage {
            sourceUrl
          }
          zurichText
          zurichEmail
          zurichPhone
          newyorkImage {
            sourceUrl
          }
          newyorkText
          newyorkEmail
          newyorkPhone
          contactTeaserHeading
          contactTeaserText
        }
      }
    }
  `;

  const variables = { slug };
  const data: { page: Page; contactPage: ContactPage } = await client.request(
    query,
    variables
  );
  return data;
}
