import { Category } from "../../lib/types";
import { request } from "./client";

export default async function getCategories(): Promise<Category[]> {
  const query = `
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

  const data: { caseCategories: { nodes: Category[] } } = await request(
    query
  );
  return data.caseCategories.nodes;
}
