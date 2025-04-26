import styles from "./styles.module.scss";
import TextSection from "../TextSection";
import Logos from "./Logos";
import { NextImage } from "../../types";

const LogoSection = ({
  caption,
  heading,
  text,
  brands,
  withoutFilters,
  Image,
}: {
  caption: string;
  heading: string;
  text?: string;
  brands: {
    data?: {
      title?: string;
      featured?: boolean;
      image?: {
        sourceUrl: string;
      };
    };
    service?: string[];
    industry?: string[];
  }[];
  withoutFilters?: boolean;
  Image: NextImage;
}) => {
  return (
    <div className={styles.logoSection}>
      <TextSection
        caption={caption}
        heading={heading}
        text={text}
        theme="blue"
        isSmall
      />
      <Logos brands={brands} withoutFilters={withoutFilters} Image={Image} />
    </div>
  );
};

export default LogoSection;
