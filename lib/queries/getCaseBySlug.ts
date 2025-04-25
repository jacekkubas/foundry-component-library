import { gql } from "graphql-request";
import { Case } from "../../lib/types";
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

export default async function getCaseBySlug(slug: string): Promise<{
  case: Case;
  contactPage: ContactPage;
  homePage: HomePage;
}> {
  const query = gql`
    query GetCaseBySlug($slug: ID!) {
      case(id: $slug, idType: SLUG) {
        id
        title
        case {
          caption
          mainImage {
            sourceUrl
          }
          details {
            heading
            text
          }
          awards {
            heading
            text
            image {
              sourceUrl
            }
          }
          content {
            ... on Case_Case_Content_Quote {
              fieldGroupName
              name
              position
              text
            }
            ... on Case_Case_Content_Results {
              fieldGroupName
              context
              approach
              outcome
            }
            ... on Case_Case_Content_Numbers {
              fieldGroupName
              number1
              text1
              number2
              text2
              number3
              text3
            }
            ... on Case_Case_Content_Video {
              fieldGroupName
              autoplay
              poster {
                sourceUrl
              }
              caption
              video
              ratio
            }
            ... on Case_Case_Content_FullWidthImage {
              fieldGroupName
              fullWidth
              image {
                sourceUrl
              }
            }
            ... on Case_Case_Content_CenterColumn {
              fieldGroupName
              text
            }
            ... on Case_Case_Content_Twocolumns {
              fieldGroupName
              left {
                ... on Case_Case_Content_Twocolumns_Left_Image {
                  fieldGroupName
                  image {
                    sourceUrl
                  }
                }
                ... on Case_Case_Content_Twocolumns_Left_Text {
                  fieldGroupName
                  text
                }
                ... on Case_Case_Content_Twocolumns_Left_Video {
                  fieldGroupName
                  autoplay
                  poster {
                    sourceUrl
                  }
                  caption
                  video
                  ratio
                }
              }
              right {
                ... on Case_Case_Content_Twocolumns_Right_Image {
                  fieldGroupName
                  image {
                    sourceUrl
                  }
                }
                ... on Case_Case_Content_Twocolumns_Right_Text {
                  fieldGroupName
                  text
                }
                ... on Case_Case_Content_Twocolumns_Right_Video {
                  fieldGroupName
                  autoplay
                  poster {
                    sourceUrl
                  }
                  caption
                  video
                  ratio
                }
              }
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
    case: Case;
    contactPage: ContactPage;
    homePage: HomePage;
  } = await client.request(query, variables);

  return {
    case: data.case,
    contactPage: data.contactPage,
    homePage: data.homePage,
  };
}
