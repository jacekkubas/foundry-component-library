import { gql } from "graphql-request";
import client from "./client";
import { Hub, PostPreview } from "../types";
import { type ContactPage } from "./getContactPage";

type HomePage = {
  homePage: {
    title: string;
    customFieldsBerlin: {
      heroShowreel2?: {
        mediaItemUrl: string;
      };
      herotextText?: string;
      hubsCaption?: string;
      hubsHeading?: string;
      hubsText?: string;
      awardsHeading?: string;
      awards?: Array<{
        image: {
          sourceUrl: string;
        };
        heading: string;
        text: string;
      }>;
      casesHeading?: string;
      casesCases?: Array<{
        id: string;
        uri: string;
        title: string;
        case: {
          caption: string;
          mainImage: {
            sourceUrl: string;
          };
        };
      }>;
      brandsCaption?: string;
      brandsHeading?: string;
      brandsText?: string;
      brands: {
        data?: {
          title?: string;
          featured?: boolean;
          image?: {
            sourceUrl: string;
          };
        };
        service?: string[];
        industry?: string[];
      }[];
      numbersHeading?: string;
      numbers?: Array<{
        number?: string;
        text?: string;
      }>;
      newsCaption?: string;
      newsHeading?: string;
      newsText?: string;
    };
  };
  hubs: {
    id: string;
    title: string;
    uri: string;
  }[];
  posts: PostPreview[];
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

export default async function getContactPage(): Promise<HomePage> {
  const query = gql`
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        customFieldsBerlin {
          heroShowreel2 {
            mediaItemUrl
          }
          herotextText
          hubsCaption
          hubsHeading
          hubsText
          awardsHeading
          awards {
            image {
              sourceUrl
            }
            heading
            text
          }
          casesHeading
          casesCases {
            ... on Case {
              id
              uri
              title
              case {
                caption
                mainImage {
                  sourceUrl
                }
              }
            }
          }
          brandsCaption
          brandsHeading
          brandsText
          brands {
            data {
              title
              featured
              image {
                sourceUrl
              }
            }
            service
            industry
          }
          numbersHeading
          numbers {
            number
            text
          }
          newsCaption
          newsHeading
          newsText
        }
      }
      hubs {
        nodes {
          id
          title
          uri
        }
      }
      posts(first: 3) {
        nodes {
          id
          title
          uri
          CustomFieldsPosts {
            excerpt
            thumbnailImage {
              sourceUrl
            }
          }
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
          berlinAddress
          berlinAddressLink
          zurichImage {
            sourceUrl
          }
          zurichText
          zurichEmail
          zurichPhone
          zurichAddress
          zurichAddressLink
          newyorkImage {
            sourceUrl
          }
          newyorkText
          newyorkEmail
          newyorkPhone
          newyorkAddress
          newyorkAddressLink
        }
      }
    }
  `;

  const variables = { slug: "home-berlin" };
  const data: {
    page: HomePage["homePage"];
    hubs: { nodes: Hub[] };
    posts: { nodes: PostPreview[] };
    contactPage: ContactPage;
  } = await client.request(query, variables);

  return {
    homePage: data.page,
    hubs: data.hubs.nodes,
    posts: data.posts.nodes,
    contactPage: data.contactPage,
  };
}
