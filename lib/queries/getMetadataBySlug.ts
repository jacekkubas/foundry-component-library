import { Metadata, Variables } from "../../lib/types";
import { request } from "./client";

export default async function getMetadataBySlug(
  slug: string,
  language: string = "EN"
) {
  const query = `
    query getMetadata($slug: String, $language: LanguageCodeFilterEnum) {
      pages(where: { name: $slug, language: $language }) {
        nodes {
          seo {
            title
            metaDesc
            opengraphImage {
              sourceUrl
            }
          }
        }
      }
      posts(where: { name: $slug, language: $language }) {
        nodes {
          seo {
            title
            metaDesc
            opengraphImage {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const variables: Variables = {
    perPage: 1,
    slug: slug,
    language: language,
  };

  const data: { pages: { nodes: Metadata[] }; posts: { nodes: Metadata[] } } =
    await request(query, variables);
  const pages = data.pages.nodes;
  const posts = data.posts.nodes;

  return [...pages, ...posts][0];
}
