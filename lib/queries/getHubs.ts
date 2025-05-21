import { gql } from "graphql-request";
import { Hub } from "../../lib/types";
import client from "./client";

export default async function getCases(): Promise<{
  hubs: Hub[];
  pageInfo: {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  homePage: {
    customFields: {
      brandsCaption: string;
      brandsHeading: string;
      brandsText: string;
      brands: {
        title: string;
        category: string;
        image: {
          sourceUrl: string;
        };
      }[];
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
}> {
  const query = gql`
    query GetHubs {
      hubs(where: { language: EN }) {
        nodes {
          id
          title
          slug
          uri
          customFieldsHub {
            caption
            heading
            subheading
            mainimage {
              sourceUrl
            }
            tags {
              tag
            }
            relatedWork {
              ... on Case {
                title
                uri
                case {
                  thumbnailImage {
                    sourceUrl
                  }
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
                    thumbnailImage {
                      sourceUrl
                    }
                    mainImage {
                      sourceUrl
                    }
                  }
                }
              }
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
    }
  `;

  const data: {
    hubs: {
      nodes: Hub[];
      pageInfo: {
        startCursor: string | null;
        endCursor: string | null;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };
    homePage: {
      customFields: {
        brandsCaption: string;
        brandsHeading: string;
        brandsText: string;
        brands: {
          title: string;
          category: string;
          image: {
            sourceUrl: string;
          };
        }[];
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
  } = await client.request(query);

  return {
    hubs: data.hubs.nodes,
    pageInfo: data.hubs.pageInfo,
    homePage: data.homePage,
  };
}
