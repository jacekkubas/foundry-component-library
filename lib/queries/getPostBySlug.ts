import { gql } from "graphql-request";
import { Post } from "../../lib/types";
import client from "./client";
import { ContactPage } from "./getContactPage";

export default async function getPostBySlug({
  slug,
  language,
}: {
  slug: string;
  language: string;
}): Promise<{
  post: Post;
  contactPage: ContactPage;
}> {
  const contactPage = language === "DE" ? "contact-de" : "contact";

  const query = gql`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        categories {
          nodes {
            name
          }
        }
        CustomFieldsPosts {
          thumbnailImage {
            sourceUrl
          }
          excerpt
          content {
            ... on Post_Customfieldsposts_Content_Video {
              fieldGroupName
              autoplay
              poster {
                sourceUrl
              }
              caption
              video
              ratio
            }
            ... on Post_Customfieldsposts_Content_FullWidthImage {
              fieldGroupName
              fullWidth
              image {
                sourceUrl
              }
            }
            ... on Post_Customfieldsposts_Content_CenterColumn {
              fieldGroupName
              text
            }
            ... on Post_Customfieldsposts_Content_Twocolumns {
              fieldGroupName
              left {
                ... on Post_Customfieldsposts_Content_Twocolumns_Left_Image {
                  fieldGroupName
                  image {
                    sourceUrl
                  }
                }
                ... on Post_Customfieldsposts_Content_Twocolumns_Left_Text {
                  fieldGroupName
                  text
                }
                ... on Post_Customfieldsposts_Content_Twocolumns_Left_Video {
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
                ... on Post_Customfieldsposts_Content_Twocolumns_Right_Image {
                  fieldGroupName
                  image {
                    sourceUrl
                  }
                }
                ... on Post_Customfieldsposts_Content_Twocolumns_Right_Text {
                  fieldGroupName
                  text
                }
                ... on Post_Customfieldsposts_Content_Twocolumns_Right_Video {
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
    }
  `;

  const variables = { slug };
  const data: { post: Post; contactPage: ContactPage } = await client.request(
    query,
    variables
  );

  return {
    post: data.post,
    contactPage: data.contactPage,
  };
}
