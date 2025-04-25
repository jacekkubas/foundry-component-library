import { gql } from "graphql-request";
import { Post, Variables } from "../../lib/types";
import client from "./client";

interface Params {
  searchTerm?: string;
  category?: string;
  params?: { before?: string | null; after?: string | null };
  language?: string;
  perPage?: number;
}

export default async function getPosts(options: Params = {}): Promise<{
  posts: Post[];
  pageInfo: {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}> {
  const {
    searchTerm = "",
    category = "",
    params = {},
    language = "EN",
    perPage = 10,
  } = options;
  const hasSearchTerm = searchTerm && searchTerm.trim() !== "";
  const hasCategoryTerm = category && category.trim() !== "";
  const isPrevious = !!params.before;

  // Definition
  const variableDefinitions = [
    "$perPage: Int!",
    isPrevious ? "$before: String" : "$after: String",
    hasSearchTerm ? "$search: String" : "",
    hasCategoryTerm ? "$categorySlug: String" : "",
    "$language: LanguageCodeFilterEnum",
  ]
    .filter(Boolean)
    .join(", ");

  // Where Clause
  const whereConditions = [
    hasSearchTerm ? "search: $search" : "",
    hasCategoryTerm ? "categoryName: $categorySlug" : "",
    "language: $language",
  ].filter(Boolean);

  const whereClause =
    whereConditions.length > 0 ? `where: { ${whereConditions.join(", ")}}` : "";

  const query = gql`
    query GetPosts(${variableDefinitions}) {
      posts(
        ${isPrevious ? "last: $perPage" : "first: $perPage"},
        ${isPrevious ? "before: $before" : "after: $after"},
        ${whereClause}
      ) {
        nodes {
          id
          title
          excerpt
          date
          slug
          uri
          categories {
            nodes {
              name
              slug
            }
          }
          CustomFieldsPosts{
            excerpt
            thumbnailImage{
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

  const data: {
    posts: {
      nodes: Post[];
      pageInfo: {
        startCursor: string | null;
        endCursor: string | null;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };
  } = await client.request(query, variables);

  return {
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
    ...(searchTerm && { searchTerm }),
    ...(category && { category }),
  };
}
