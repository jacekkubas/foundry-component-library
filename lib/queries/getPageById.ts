import { Page, Variables } from "../../lib/types";
import { request } from "./client";
import { ContactPage } from "./getContactPage";

export default async function getPageById(
  id: string,
  language: string,
): Promise<{ page: Page; contactPage: ContactPage }> {
  const contactPage = language === "DE" ? "contact-de" : "contact";

  const query = `
    query GetPageById($id: ID!) {
      page(id: $id, idType: DATABASE_ID) {
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

  const variables: Variables = { id, language };
  const data: { page: Page; contactPage: ContactPage } = await request(
    query,
    variables,
  );
  return data;
}
