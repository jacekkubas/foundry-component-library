import { gql } from "graphql-request";
import { Case, Hub } from "../../lib/types";
import client from "./client";
import { type ContactPage } from "./getContactPage";

type HomePage = {
  customFieldsBerlin: {
    awardsHeading?: string;
    awards?: Array<{
      image: {
        sourceUrl: string;
      };
      heading: string;
      text: string;
    }>;
  };
};

type HubFields = {
  hub: Hub;
  contactPage: ContactPage;
  cases: Case[];
  homePage: HomePage;
};

export default async function getCaseBySlug({
  slug,
}: {
  slug: string;
}): Promise<HubFields> {
  const query = gql`
    query GetHubBySlug($slug: ID!) {
      hub(id: $slug, idType: SLUG) {
        id
        title
        customFieldsHub {
          caption
          heading
          subheading
          mainimage {
            sourceUrl
          }
          relatedWork {
            ... on Case {
              title
              uri
              case {
                mainImage {
                  sourceUrl
                }
              }
            }
          }
          capabilities {
            heading
            text
            cases {
              ... on Case {
                title
                uri
                case {
                  mainImage {
                    sourceUrl
                  }
                }
              }
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
      cases(first: 3) {
        nodes {
          id
          title
          slug
          uri
          case {
            thumbnailVideo {
              mediaItemUrl
            }
            mainImage {
              sourceUrl
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
      homePage: page(id: "home-berlin", idType: URI) {
        customFieldsBerlin {
          awardsHeading
          awards {
            image {
              sourceUrl
            }
            heading
            text
          }
        }
      }
    }
  `;

  const variables = { slug };
  const data: {
    hub: Hub;
    contactPage: ContactPage;
    cases: { nodes: Case[] };
    homePage: HomePage;
  } = await client.request(query, variables);

  return {
    hub: data.hub,
    contactPage: data.contactPage,
    cases: data.cases.nodes,
    homePage: data.homePage,
  };
}
