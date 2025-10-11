import Image from "next/image";
import Link from "next/link";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export type NextImage = typeof Image;
export type NextLink = typeof Link;
export type NextRouter = AppRouterInstance;
export type NextSearchParams = ReadonlyURLSearchParams;

export interface Variables {
  perPage: number;
  before?: string | null;
  after?: string | null;
  search?: string;
  categorySlug?: string;
  language: string;
  slug?: string;
  exclude?: string;
}

export interface Metadata {
  seo?: {
    title: string;
    metaDesc: string;
    opengraphImage: {
      sourceUrl: string;
    };
  };
}

type ColumnImage = {
  fieldGroupName:
    | "Post_Customfieldsposts_Content_Twocolumns_Left_Image"
    | "Post_Customfieldsposts_Content_Twocolumns_Right_Image"
    | "Case_Case_Content_Twocolumns_Left_Image"
    | "Case_Case_Content_Twocolumns_Right_Image"
    | "Case_Case_Content_Threecolumns_Left_Image"
    | "Case_Case_Content_Threecolumns_Center_Image"
    | "Case_Case_Content_Threecolumns_Right_Image";
  image: { sourceUrl: string };
  caption?: string;
};

type ColumnText = {
  fieldGroupName:
    | "Post_Customfieldsposts_Content_Twocolumns_Left_Text"
    | "Post_Customfieldsposts_Content_Twocolumns_Right_Text"
    | "Case_Case_Content_Twocolumns_Left_Text"
    | "Case_Case_Content_Twocolumns_Right_Text"
    | "Case_Case_Content_Threecolumns_Left_Text"
    | "Case_Case_Content_Threecolumns_Center_Text"
    | "Case_Case_Content_Threecolumns_Right_Text";
  text: string;
};

export type ColumnOption = ColumnImage | ColumnText | Video;

export type FullWidthImage = {
  fieldGroupName:
    | "Post_Customfieldsposts_Content_FullWidthImage"
    | "Case_Case_Content_FullWidthImage";
  fullWidth?: boolean;
  image: { sourceUrl: string };
  caption: string;
};

export type CenterColumn = {
  fieldGroupName:
    | "Post_Customfieldsposts_Content_CenterColumn"
    | "Case_Case_Content_CenterColumn";
  text: string;
};

export type TwoColumns = {
  fieldGroupName:
    | "Post_Customfieldsposts_Content_Twocolumns"
    | "Case_Case_Content_Twocolumns";
  left?: ColumnOption[];
  right?: ColumnOption[];
};

export type ThreeColumns = {
  fieldGroupName: "Case_Case_Content_Threecolumns";
  left?: ColumnOption[];
  center?: ColumnOption[];
  right?: ColumnOption[];
};

export type Video = {
  fieldGroupName:
    | "Post_Customfieldsposts_Content_Video"
    | "Case_Case_Content_Video"
    | "Post_Customfieldsposts_Content_Twocolumns_Left_Video"
    | "Post_Customfieldsposts_Content_Twocolumns_Right_Video"
    | "Case_Case_Content_Twocolumns_Left_Video"
    | "Case_Case_Content_Twocolumns_Right_Video"
    | "Case_Case_Content_Threecolumns_Left_Video"
    | "Case_Case_Content_Threecolumns_Center_Video"
    | "Case_Case_Content_Threecolumns_Right_Video";
  autoplay: boolean;
  poster: { sourceUrl: string };
  caption: string;
  video: string;
  ratio: string;
};

export type Quote = {
  fieldGroupName: "Case_Case_Content_Quote";
  name?: string;
  position?: string;
  text?: string;
};

export type Results = {
  fieldGroupName: "Case_Case_Content_Results";
  context: string;
  approach: string;
  outcome: string;
};

export type Numbers = {
  fieldGroupName: "Case_Case_Content_Numbers";
  number1: string;
  text1: string;
  number2: string;
  text2: string;
  number3: string;
  text3: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  count: number;
};

export type Content = (
  | FullWidthImage
  | CenterColumn
  | TwoColumns
  | ThreeColumns
  | Video
  | Results
  | Numbers
  | Quote
)[];

export type Page = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  author: {
    node: {
      name: string;
    };
  };
  categories: {
    nodes: {
      name: Array<string>;
    };
  };
  tags: {
    nodes: {
      name: string;
    };
  };
  customFields: {
    brands: {
      title: string;
      image: {
        sourceUrl: string;
      };
    }[];
  };
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  uri: string;
  date: string;
  content: string;
  author: {
    node: {
      name: string;
    };
  };
  categories: {
    nodes: {
      name: Array<string>;
    };
  };
  tags: {
    nodes: {
      name: string;
    };
  };
  CustomFieldsPosts: {
    thumbnailImage: {
      sourceUrl: string;
    };
    excerpt: string;
    content: Content;
  };
};

export type PostPreview = {
  id: string;
  title: string;
  uri: string;
  CustomFieldsPosts: {
    excerpt: string;
    thumbnailImage: {
      sourceUrl: string;
    };
  };
};

export type Case = {
  id: string;
  title: string;
  slug?: string;
  uri: string;
  link?: string;
  date?: string;
  content?: string;
  status?: string;
  author?: {
    node: {
      name: string;
    };
  };
  categories?: {
    nodes: {
      name: Array<string>;
    };
  };
  case: {
    excerpt?: string;
    caption?: string;
    featured?: boolean;
    service?: string[];
    industry?: string[];
    relatedCases?: {
      id: string;
      title: string;
      uri: string;
      case: {
        thumbnailImage?: {
          sourceUrl: string;
        };
        mainImage?: {
          sourceUrl: string;
        };
      };
    }[];
    thumbnailVideo?: {
      mediaItemUrl: string;
    };
    thumbnailImage?: {
      sourceUrl: string;
    };
    mainImage?: {
      sourceUrl: string;
    };
    details?: {
      heading: string;
      text: string;
    }[];
    awards?: {
      heading: string;
      text: string;
      image: {
        sourceUrl: string;
      };
    }[];
    content?: Content;
  };
};

export type OfficeDetails = {
  berlinImage?: {
    sourceUrl: string;
  };
  berlinText?: string;
  berlinEmail?: string;
  berlinPhone?: string;
  berlinAddress?: string;
  berlinAddressLink?: string;
  zurichImage?: {
    sourceUrl: string;
  };
  zurichText?: string;
  zurichEmail?: string;
  zurichPhone?: string;
  zurichAddress?: string;
  zurichAddressLink?: string;
  newyorkImage?: {
    sourceUrl: string;
  };
  newyorkText?: string;
  newyorkEmail?: string;
  newyorkPhone?: string;
  newyorkAddress?: string;
  newyorkAddressLink?: string;
};

export type Hub = {
  id: string;
  title: string;
  slug: string;
  uri: string;
  customFieldsHub: {
    mainimage: {
      sourceUrl: string;
    };
    mainvideo: {
      mediaItemUrl: string;
    };
    caption: string;
    heading: string;
    subheading: string;
    tags: {
      tag: string;
    }[];
    approach: string;
    relatedWork: Case[];
    capabilities: {
      heading: string;
      text: string;
      cases: Case[];
    }[];
    quoteName?: string;
    quotePosition?: string;
    quoteText?: string;
  };
};

export type Person = {
  name: string;
  position: string;
  tags: string[];
  image: {
    sourceUrl: string;
  };
  video: {
    sourceUrl: string;
  };
};
