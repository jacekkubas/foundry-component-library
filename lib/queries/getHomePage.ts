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
          thumbnailImage: {
            sourceUrl: string;
          };
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
      heroImage?: {
        sourceUrl: string;
      };
      heroHeading?: string;
      heroButtonText?: string;
      heroButtonHref?: string;
      newsCaption?: string;
      newsHeading?: string;
      newsText?: string;
    };
  };
  hubs: {
    id: string;
    title: string;
    uri: string;
    customFieldsHub: {
      heading: string;
    };
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
      contactTeaserHeading?: string;
      contactTeaserText?: string;
    };
  };
  aboutPage: {
    customFieldsAboutBerlin: {
      partnersCaption?: string;
      partnersHeading?: string;
      partnersText?: string;
      partners?: {
        image: {
          sourceUrl: string;
        };
      }[];
    };
  };
};

export default async function getHomePage({
  slug,
  language,
}: {
  slug: string;
  language: string;
}): Promise<HomePage> {
  const contactPage = language === "EN" ? "contact" : "contact-de";
  const aboutPage = language === "EN" ? "about-berlin" : "about-berlin-de";

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
                thumbnailImage {
                  sourceUrl
                }
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
          heroImage {
            sourceUrl
          }
          heroHeading
          heroButtonText
          heroButtonHref
          newsCaption
          newsHeading
          newsText
        }
      }
      hubs(where: {language: ${language}}) {
        nodes {
          id
          title
          uri
          customFieldsHub {
            heading
          }
        }
      }
      posts(first: 3, where: {language: ${language}}) {
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
      contactPage: page(id: "${contactPage}", idType: URI) {
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
          contactTeaserHeading
          contactTeaserText
        }
      }
      aboutPage: page(id: "${aboutPage}", idType: URI) {
        customFieldsAboutBerlin {
          partnersCaption
          partnersHeading
          partnersText
          partners {
            image {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const variables = { slug: slug };
  const data: {
    page: HomePage["homePage"];
    hubs: { nodes: Hub[] };
    posts: { nodes: PostPreview[] };
    contactPage: ContactPage;
    aboutPage: HomePage["aboutPage"];
  } = await client.request(query, variables);

  return {
    homePage: data.page,
    hubs: data.hubs.nodes,
    posts: data.posts.nodes,
    contactPage: data.contactPage,
    aboutPage: data.aboutPage,
  };
}
