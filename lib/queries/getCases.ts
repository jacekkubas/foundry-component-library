import { gql } from "graphql-request";
import { Case, Variables } from "../../lib/types";
import client from "./client";

type Params = {
  perPage?: number;
  searchTerm?: string;
  category?: string;
  params?: { before?: string | null; after?: string | null };
  language?: string;
  exclude?: string;
};

export default async function getCases({
  perPage = 12,
  searchTerm = "",
  category = "",
  params = { before: null, after: null },
  language = "EN",
  exclude = "",
}: Params): Promise<{
  cases: Case[];
  pageInfo: {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}> {
  const hasSearchTerm = searchTerm && searchTerm.trim() !== "";
  const hasCategoryTerm = category && category.trim() !== "";
  const isPrevious = !!params.before;

  // Definition
  const variableDefinitions = [
    "$perPage: Int!",
    isPrevious ? "$before: String" : "$after: String",
    hasSearchTerm ? "$search: String" : "",
    hasCategoryTerm ? "$categorySlug: [String]" : "",
    exclude ? "$exclude: [ID]" : "",
    "$language: LanguageCodeFilterEnum",
  ]
    .filter(Boolean)
    .join(", ");

  // Where Clause
  const whereConditions = [
    hasSearchTerm ? "search: $search" : "",
    hasCategoryTerm ? "caseCategory: $categorySlug" : "",
    exclude ? "notIn: $exclude" : "",
    "language: $language",
  ].filter(Boolean);

  const whereClause =
    whereConditions.length > 0 ? `where: { ${whereConditions.join(", ")}}` : "";

  const query = gql`
    query GetCases(${variableDefinitions}) {
      cases(
        ${isPrevious ? "last: $perPage" : "first: $perPage"},
        ${isPrevious ? "before: $before" : "after: $after"},
        ${whereClause}
      ) {
        nodes {
          id
          title
          slug
          uri
          case {
            thumbnailVideo{
              mediaItemUrl
            }
            mainImage {
              sourceUrl
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;

  const variables: Variables = {
    perPage: perPage,
    language: language,
    ...(isPrevious ? { before: params.before } : { after: params.after }),
  };

  if (hasSearchTerm) {
    variables.search = searchTerm;
  }

  if (hasCategoryTerm) {
    variables.categorySlug = category;
  }

  if (exclude) {
    variables.exclude = exclude;
  }

  const data: {
    cases: {
      nodes: Case[];
      pageInfo: {
        startCursor: string | null;
        endCursor: string | null;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };
  } = await client.request(query, variables);

  return {
    cases: data.cases.nodes,
    pageInfo: data.cases.pageInfo,
    ...(searchTerm && { searchTerm }),
    ...(category && { category }),
  };
}
