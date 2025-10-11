import { gql } from "graphql-request";
import { Variables, Post } from "../../lib/types";
import client from "./client";
import { type ContactPage } from "./getContactPage";

type NewsPage = {
  title: string;
  customFieldsNews: {
    textCaption?: string;
    textHeading?: string;
    textText?: string;
    contactHeading?: string;
    contactText?: string;
  };
};

type Params = {
  perPage?: number;
  searchTerm?: string;
  category?: string;
  params?: { before?: string | null; after?: string | null };
  language: string;
  exclude?: string;
  slug: string;
};

export default async function getNewsPage(options: Params): Promise<{
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
    slug,
  } = options;
  const hasSearchTerm = searchTerm && searchTerm.trim() !== "";
  const hasCategoryTerm = category && category.trim() !== "";
  const isPrevious = !!params.before;
  const contactPage = language === "DE" ? "contact-de" : "contact";

  // Definition
  const variableDefinitions = [
    "$slug: ID!",
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
      newsPage: page(id: $slug, idType: URI) {
        title
        customFieldsNews {
          textCaption
          textHeading
          textText
          contactHeading
          contactText
        }
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

  const variables: Variables = {
    perPage: perPage,
    language: language,
    slug: slug,
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
