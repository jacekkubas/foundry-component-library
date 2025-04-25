import { gql } from "graphql-request";
import client from "./client";

export type ContactPage = {
  title: string;
  customFieldsContact: {
    title: string;
    subtitle: string;
    berlinImage: {
      sourceUrl: string;
    };
    berlinText: string;
    berlinEmail: string;
    berlinPhone: string;
    berlinAddress: string;
    berlinAddressLink: string;
    zurichImage: {
      sourceUrl: string;
    };
    zurichText: string;
    zurichEmail: string;
    zurichPhone: string;
    zurichAddress: string;
    zurichAddressLink: string;
    newyorkImage: {
      sourceUrl: string;
    };
    newyorkText: string;
    newyorkEmail: string;
    newyorkPhone: string;
    newyorkAddress: string;
    newyorkAddressLink: string;
    contactsTitle: string;
    contactsSubtitle: string;
    contacts: {
      heading: string;
      subheading: string;
      email: string;
    }[];
    bankTitle: string;
    berlinHeading: string;
    berlinDetails: string;
    swissHeading: string;
    swissDetails: string;
  };
};

export default async function getContactPage(): Promise<ContactPage | null> {
  const query = gql`
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        customFieldsContact {
          title
          subtitle
          berlinImage {
            sourceUrl
          }
          berlinText
          berlinEmail
          berlinPhone
          berlinAddress
          berlinAddressLink
          zurichImage {
            sourceUrl
          }
          zurichText
          zurichEmail
          zurichPhone
          zurichAddress
          zurichAddressLink
          newyorkImage {
            sourceUrl
          }
          newyorkText
          newyorkEmail
          newyorkPhone
          newyorkAddress
          newyorkAddressLink
          contactsTitle
          contactsSubtitle
          contacts {
            heading
            subheading
            email
          }
          bankTitle
          berlinHeading
          berlinDetails
          swissHeading
          swissDetails
        }
      }
    }
  `;

  const variables = { slug: "contact" };
  const data: { page: ContactPage } = await client.request(query, variables);
  return data.page;
}
