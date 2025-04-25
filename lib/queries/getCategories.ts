import { gql } from "graphql-request";
import { Category } from "../../lib/types";
import client from "./client";

export default async function getCategories(): Promise<Category[]> {
  const query = gql`
    query getCategories {
      caseCategories(where: { language: EN }) {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  `;

  const data: { caseCategories: { nodes: Category[] } } = await client.request(
    query
  );
  return data.caseCategories.nodes;
}
