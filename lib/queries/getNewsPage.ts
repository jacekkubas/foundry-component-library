import { gql } from "graphql-request";
import { Variables, Post } from "../../lib/types";
import client from "./client";
import { type ContactPage } from "./getContactPage";

type NewsPage = {
  title: string;
  caption: string;
  heading: string;
  text: string;
};

type Params = {
  perPage?: number;
  searchTerm?: string;
  category?: string;
  params?: { before?: string | null; after?: string | null };
  language?: string;
  exclude?: string;
};

export default async function getCasesPage(options: Params = {}): Promise<{
  newsPage: NewsPage;
  posts: Post[];
  pageInfo: {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  contactPage: ContactPage;
}> {
  const {
    searchTerm = "",
    category = "",
    params = {},
    language = "EN",
    perPage = 10,
    exclude = "",
  } = options;
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
    query GetNewsPage(${variableDefinitions}) {
      newsPage: page(id: "news", idType: URI) {
        title
      }
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
    newsPage: NewsPage;
    posts: {
      nodes: Post[];
      pageInfo: {
        startCursor: string | null;
        endCursor: string | null;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };
    contactPage: ContactPage;
  } = await client.request(query, variables);

  return {
    newsPage: data.newsPage,
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
    contactPage: data.contactPage,
    ...(searchTerm && { searchTerm }),
    ...(category && { category }),
  };
}
