import { gql } from "graphql-request";
import client from "./client";

type PerformancePage = {
  homePage: {
    customFieldsBerlin: {
      awards?: Array<{
        image: {
          sourceUrl: string;
        };
        heading: string;
        text: string;
      }>;
    };
  };
  performancePage: {
    performanceHub: {
      video?: {
        mediaItemUrl: string;
      };
      bigText?: string;
      partnersCaption?: string;
      partnersHeading?: string;
      partners?: {
        logo?: {
          sourceUrl: string;
        };
      }[];
      growthTitle?: string;
      growthText?: string;
      performanceTitle?: string;
      performanceCases: {
        image?: {
          sourceUrl: string;
        };
        title: string;
        text: string;
        details?: {
          percent?: string;
          detail?: string;
        }[];
      }[];
      clientsTitle?: string;
      processTitle?: string;
      processTiles?: {
        heading?: string;
        text?: string;
      }[];
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
      contactTeaserHeading?: string;
      contactTeaserText?: string;
    };
  };
};

export default async function getPerformanceHubPage(): Promise<PerformancePage> {
  const query = gql`
    query GetPageBySlug($slug: ID!) {
      homePage: page(id: "home-berlin", idType: URI) {
        customFieldsBerlin {
          awards {
            image {
              sourceUrl
            }
            heading
            text
          }
        }
      }
      performancePage: page(id: $slug, idType: URI) {
        performanceHub {
          video {
            mediaItemUrl
          }
          bigText
          partnersCaption
          partnersHeading
          partners {
            logo {
              sourceUrl
            }
          }
          growthTitle
          growthText
          performanceTitle
          performanceCases {
            image {
              sourceUrl
            }
            title
            text
            details {
              percent
              detail
            }
          }
          clientsTitle
          processTitle
          processTiles {
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
          contactTeaserHeading
          contactTeaserText
        }
      }
    }
  `;

  const variables = { slug: "performance-hub" };
  const data: {
    homePage: PerformancePage["homePage"];
    performancePage: PerformancePage["performancePage"];
    contactPage: PerformancePage["contactPage"];
  } = await client.request(query, variables);

  return {
    homePage: data.homePage,
    performancePage: data.performancePage,
    contactPage: data.contactPage,
  };
}
