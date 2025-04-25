import { gql } from "graphql-request";
import { Case, Variables } from "../../lib/types";
import client from "./client";
import { type ContactPage } from "./getContactPage";

export const casesPerPage = 10;

type HomePage = {
  customFieldsBerlin: {
    awardsHeading?: string;
    awards?: Array<{
      image: {
        sourceUrl: string;
      };
      heading: string;
      text: string;
    }>;
  };
};

type Params = {
  perPage?: number;
  searchTerm?: string;
  category?: string;
  params?: { before?: string | null; after?: string | null };
  language?: string;
  exclude?: string;
  page?: number;
  service?: string;
  industry?: string;
};

export default async function getCasesPage({
  perPage = casesPerPage,
  searchTerm = "",
  category = "",
  params = { before: null, after: null },
  language = "EN",
  exclude = "",
  page = 1,
  service = "",
  industry = "",
}: Params): Promise<{
  cases: Case[];
  contactPage: ContactPage;
  homePage: HomePage;
  pageInfo: {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    offsetPagination: {
      hasMore: boolean;
      hasPrevious: boolean;
      total: number;
    };
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
    page
      ? `offsetPagination:{ offset: ${(page - 1) * perPage}, size: ${perPage} }`
      : "",
    `metaQuery: { relation: AND, metaArray: [ ${
      !service && !industry
        ? `{key: "featured", value: "1", compare: LIKE }`
        : ""
    } ${
      service ? `{ key: "service", value: "${service}", compare: LIKE },` : ""
    } ${
      industry ? `{ key: "industry", value: "${industry}", compare: LIKE }` : ""
    }]}`,
  ].filter(Boolean);

  const whereClause =
    whereConditions.length > 0 ? `where: { ${whereConditions.join(", ")}}` : "";

  const query = gql`
    query GetCasesPage(${variableDefinitions}) {
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
            featured
            service
            industry
            thumbnailVideo{
              mediaItemUrl
            }
            mainImage {
              sourceUrl
            }
            caption
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
          offsetPagination {
            hasMore
            hasPrevious
            total
          }
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
      homePage: page(id: "home-berlin", idType: URI) {
        customFieldsBerlin {
          awardsHeading
          awards {
            image {
              sourceUrl
            }
            heading
            text
          }
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
        offsetPagination: {
          hasMore: boolean;
          hasPrevious: boolean;
          total: number;
        };
      };
    };
    contactPage: ContactPage;
    homePage: HomePage;
  } = await client.request(query, variables);

  return {
    cases: data.cases.nodes,
    contactPage: data.contactPage,
    homePage: data.homePage,
    pageInfo: data.cases.pageInfo,
    ...(searchTerm && { searchTerm }),
    ...(category && { category }),
  };
}
