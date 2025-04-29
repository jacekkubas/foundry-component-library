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
      zurichImage?: {
        sourceUrl: string;
      };
      zurichText?: string;
      zurichEmail?: string;
      zurichPhone?: string;
      newyorkImage?: {
        sourceUrl: string;
      };
      newyorkText?: string;
      newyorkEmail?: string;
      newyorkPhone?: string;
    };
  };
};

export default async function getContactPage({
  slug,
}: {
  slug: string;
}): Promise<PeoplePage> {
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
        }
      }
      contactPage: page(id: "contact", idType: URI) {
        customFieldsContact {
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
