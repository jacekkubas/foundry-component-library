import { gql } from "graphql-request";
import { Case, Variables } from "../../lib/types";
import client from "./client";
import { type ContactPage } from "./getContactPage";

export const casesPerPage = 10;

type CasesPage = {
  customFieldsCases: {
    topCaption?: string;
    topHeading?: string;
    topText?: string;
    contactHeading?: string;
    contactText?: string;
  };
};

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
  language: string;
  exclude?: string;
  page?: number;
  service?: string;
  industry?: string;
  isPreview?: boolean;
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
  isPreview = false,
}: Params): Promise<{
  casesPage: CasesPage;
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
  const casesPage = language === "DE" ? 360 : 363;
  const homePage = language === "DE" ? "home-berlin-de" : "home-berlin";
  const contactPage = language === "DE" ? "contact-de" : "contact";

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
    isPreview ? "status: DRAFT" : "status: PUBLISH",
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
      casesPage: page(id: "${casesPage}", idType: DATABASE_ID) {
        customFieldsCases {
          topCaption
          topHeading
          topText
          contactHeading
          contactText
        }
      }
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
          status
          case {
            featured
            service
            industry
            thumbnailVideo{
              mediaItemUrl
            }
            thumbnailImage {
              sourceUrl
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
      homePage: page(id: "${homePage}", idType: URI) {
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
    casesPage: CasesPage;
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
    casesPage: data.casesPage,
    cases: data.cases.nodes,
    contactPage: data.contactPage,
    homePage: data.homePage,
    pageInfo: data.cases.pageInfo,
    ...(searchTerm && { searchTerm }),
    ...(category && { category }),
  };
}
