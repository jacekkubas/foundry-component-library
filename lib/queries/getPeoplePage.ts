import { gql } from "graphql-request";
import client from "./client";
import { type ContactPage } from "./getContactPage";
import { Person } from "../types";

type PeoplePage = {
  peoplePage: {
    title: string;
    customFieldsPeople: {
      people: Person[];
      managementCaption: string;
      managementHeading: string;
      management?: {
        quote?: string;
        name?: string;
        position?: string;
        image?: {
          sourceUrl: string;
        };
      }[];
      quoteName?: string;
      quotePosition?: string;
      quoteText?: string;
      heroImage?: {
        sourceUrl: string;
      };
      heroHeading?: string;
    };
  };
  contactPage: {
    customFieldsContact: {
      berlinImage?: {
        sourceUrl: string;
      };
      berlinText?: string;
      berlinEmail?: string;
      berlinPhone?: string;
      berlinAddress?: string;
      zurichImage?: {
        sourceUrl: string;
      };
      zurichText?: string;
      zurichEmail?: string;
      zurichPhone?: string;
      zurichAddress?: string;
      newyorkImage?: {
        sourceUrl: string;
      };
      newyorkText?: string;
      newyorkEmail?: string;
      newyorkPhone?: string;
      newyorkAddress?: string;
      contactTeaserHeading?: string;
      contactTeaserText?: string;
    };
  };
};

export default async function getContactPage({
  slug,
  language,
}: {
  slug: string;
  language: string;
}): Promise<PeoplePage> {
  const contactPage = language === "DE" ? "contact-de" : "contact";

  const query = gql`
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        customFieldsPeople {
          people {
            name
            image {
              sourceUrl
            }
            video {
              sourceUrl
            }
            position
            tags
          }
          managementCaption
          managementHeading
          management {
            quote
            name
            position
            image {
              sourceUrl
            }
          }
          quoteName
          quotePosition
          quoteText
          heroImage {
            sourceUrl
          }
          heroHeading
        }
      }
      contactPage: page(id: "${contactPage}", idType: URI) {
        customFieldsContact {
          berlinImage {
            sourceUrl
          }
          berlinText
          berlinEmail
          berlinPhone
          berlinAddress
          zurichImage {
            sourceUrl
          }
          zurichText
          zurichEmail
          zurichPhone
          zurichAddress
          newyorkImage {
            sourceUrl
          }
          newyorkText
          newyorkEmail
          newyorkPhone
          newyorkAddress
          contactTeaserHeading
          contactTeaserText
        }
      }
    }
  `;

  const variables = { slug: slug };
  const data: {
    page: PeoplePage["peoplePage"];
    contactPage: ContactPage;
  } = await client.request(query, variables);

  return {
    peoplePage: data.page,
    contactPage: data.contactPage,
  };
}
