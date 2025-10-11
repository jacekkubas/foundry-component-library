import { gql } from "graphql-request";
import client from "./client";

type AboutPage = {
  aboutPage: {
    customFieldsAboutBerlin: {
      topImage?: {
        sourceUrl: string;
      };
      topText?: string;
      text1Caption?: string;
      text1Heading?: string;
      columnsHeading?: string;
      columnsText?: string;
      columnsImage?: {
        sourceUrl: string;
      };
      tilesCaption?: string;
      tilesHeading?: string;
      tiles?: {
        heading?: string;
        hoverText?: string;
      }[];
      quotes?: {
        name?: string;
        position?: string;
        text?: string;
      }[];
      partnersCaption?: string;
      partnersHeading?: string;
      partnersText?: string;
      partners?: {
        image?: {
          sourceUrl: string;
        };
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
      facebook: string;
      instagram: string;
      linkedin: string;
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
      contactTeaserHeading?: string;
      contactTeaserText?: string;
    };
  };
};

export default async function getAboutPage({
  slug,
  language,
}: {
  slug: string;
  language: string;
}): Promise<AboutPage> {
  const homePage = language === "DE" ? "home-berlin-de" : "home-berlin";
  const contactPage = language === "DE" ? "contact-de" : "contact";

  const query = gql`
    query GetPageBySlug($slug: ID!) {
      aboutPage: page(id: $slug, idType: URI) {
        customFieldsAboutBerlin {
          topImage {
            sourceUrl
          }
          topText
          text1Caption
          text1Heading
          columnsHeading
          columnsText
          columnsImage {
            sourceUrl
          }
          tilesCaption
          tilesHeading
          tiles {
            heading
            hoverText
          }
          quotes {
            name
            position
            text
          }
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
      homePage: page(id: "${homePage}", idType: URI) {
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
    }
  `;

  const variables = { slug: slug };
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
