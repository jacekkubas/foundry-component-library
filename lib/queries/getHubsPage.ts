import { gql } from "graphql-request";
import { Variables, Hub } from "../../lib/types";
import client from "./client";
import { type ContactPage } from "./getContactPage";

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

type AboutPage = {
  customFieldsAboutBerlin: {
    partnersCaption?: string;
    partnersHeading?: string;
    partnersText?: string;
    partners?: {
      image?: {
        sourceUrl: string;
      };
    }[];
  };
};

type HubsPage = {
  title: string;
  customFieldsHubs: {
    caption?: string;
    heading?: string;
    text?: string;
    mainimage?: {
      sourceUrl: string;
    };
  };
};

type Params = {
  perPage?: number;
  searchTerm?: string;
  category?: string;
  params?: { before?: string | null; after?: string | null };
  language?: string;
  exclude?: string;
  slug?: string;
};

export default async function getCasesPage(options: Params = {}): Promise<{
  hubsPage: HubsPage;
  hubs: Hub[];
  pageInfo: {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  contactPage: ContactPage;
  homePage: HomePage;
  aboutPage: AboutPage;
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
      hubsPage: page(id: $slug, idType: URI) {
        title
        id
        customFieldsHubs {
          caption
          heading
          text
          mainimage {
            sourceUrl
          }
        }
      }
      hubs(
        ${isPrevious ? "last: $perPage" : "first: $perPage"},
        ${isPrevious ? "before: $before" : "after: $after"},
        ${whereClause}
      ) {
        nodes {
          id
          title
          slug
          uri
          customFieldsHub {
            heading
            subheading
            approach
            tags {
              tag
            }
            relatedWork {
              ... on Case {
                id
                title
                uri
                case {
                  mainImage {
                    sourceUrl
                  }
                }
              }
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
      contactPage: page(id: "${
        language === "EN" ? "contact" : "contact-de"
      }", idType: URI) {
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
      homePage: page(id: "${
        language === "EN" ? "home-berlin" : "home-berlin-de"
      }", idType: URI) {
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
      aboutPage: page(id: "${
        language === "EN" ? "about-berlin" : "about-berlin-de"
      }", idType: URI) {
        customFieldsAboutBerlin {
          partnersCaption
          partnersHeading
          partnersText
          partners {
            image {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const variables: Variables = {
    slug: slug,
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
    hubsPage: HubsPage;
    hubs: {
      nodes: Hub[];
      pageInfo: {
        startCursor: string | null;
        endCursor: string | null;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };
    contactPage: ContactPage;
    homePage: HomePage;
    aboutPage: AboutPage;
  } = await client.request(query, variables);

  return {
    hubsPage: data.hubsPage,
    hubs: data.hubs.nodes,
    pageInfo: data.hubs.pageInfo,
    contactPage: data.contactPage,
    homePage: data.homePage,
    aboutPage: data.aboutPage,
    ...(searchTerm && { searchTerm }),
    ...(category && { category }),
  };
}
