import { Metadata, Variables } from "../../lib/types";
import { request } from "./client";

export default async function getNewsMetadataBySlug(slug: string) {
  const query = `
    query getMetadata($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        seo {
          title
          metaDesc
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  `;

  const variables: Variables = {
    slug: slug,
    language: "EN",
  };

  const data: { post: Metadata } = await request(query, variables);

  return data.post;
}
