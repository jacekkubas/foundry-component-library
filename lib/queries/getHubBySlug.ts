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
  language,
}: {
  slug: string;
  language: string;
}): Promise<HubFields> {
  const homePage = language === "DE" ? "home-berlin-de" : "home-berlin";
  const contactPage = language === "DE" ? "contact-de" : "contact";

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
      contactPage: page(id: "${contactPage}", idType: URI) {
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
          contactTeaserHeading
          contactTeaserText
        }
      }
      cases(first: 3, where: {language: ${language}}) {
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
      homePage: page(id: "${homePage}", idType: URI) {
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
