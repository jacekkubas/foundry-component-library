import { Metadata, Variables } from "../../lib/types";
import { request } from "./client";

export default async function getCaseMetadataBySlug(slug: string) {
  const query = `
    query getMetadata($slug: ID!) {
      case(id: $slug, idType: SLUG) {
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

  const data: { case: Metadata } = await request(query, variables);

  return data.case;
}
