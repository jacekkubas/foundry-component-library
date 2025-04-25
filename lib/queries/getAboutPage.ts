import { gql } from "graphql-request";
import client from "./client";

type AboutPage = {
  aboutPage: {
    customFieldsAbout: {
      partnersCaption?: string;
      partnersHeading?: string;
      partnersText?: string;
      partners?: {
        image?: {
          sourceUrl: string;
        };
      }[];
      quotes: {
        name: string;
        position: string;
        text: string;
      }[];
    };
  };
  homePage: {
    customFieldsBerlin: {
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
  contactPage: {
    customFieldsContact: {
      berlinImage?: {
        sourceUrl: string;
      };
      berlinText?: string;
      berlinEmail?: string;
      berlinPhone?: string;
      berlinAddresLink?: string;
      zurichImage?: {
        sourceUrl: string;
      };
      zurichText?: string;
      zurichEmail?: string;
      zurichPhone?: string;
      zurichAddressLink?: string;
      newyorkImage?: {
        sourceUrl: string;
      };
      newyorkText?: string;
      newyorkEmail?: string;
      newyorkPhone?: string;
      newyorkAddressLink?: string;
    };
  };
};

export default async function getContactPage(): Promise<AboutPage> {
  const query = gql`
    query GetPageBySlug($slug: ID!) {
      aboutPage: page(id: "about-us", idType: URI) {
        customFieldsAbout {
          partnersCaption
          partnersHeading
          partnersText
          partners {
            image {
              sourceUrl
            }
          }
          quotes {
            name
            position
            text
          }
        }
      }
      homePage: page(id: $slug, idType: URI) {
        customFieldsBerlin {
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
    aboutPage: AboutPage["aboutPage"];
    homePage: AboutPage["homePage"];
    contactPage: AboutPage["contactPage"];
  } = await client.request(query, variables);

  return {
    aboutPage: data.aboutPage,
    homePage: data.homePage,
    contactPage: data.contactPage,
  };
}
