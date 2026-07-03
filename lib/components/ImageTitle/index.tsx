import { NextImage } from "../../types";
import Container from "../Container";
import styles from "./styles.module.scss";

const ImageTitle = ({
  image,
  heading,
  text,
  isInverse,
  Image,
}: {
  image?: string;
  heading?: string;
  text?: string;
  isInverse?: boolean;
  Image: NextImage;
}) => {
  const inverseStyle = isInverse ? styles.inverse : "";

  return (
    <Container>
      <div className={`${styles.imageTitle} ${inverseStyle}`}>
        <div className={styles.texts}>
          <div>
            <div
              className={styles.heading}
              dangerouslySetInnerHTML={{ __html: heading || "" }}
            />
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: text || "" }}
            />
          </div>
        </div>
        {image && (
          <div className={styles.image}>
            <Image src={image} alt={heading || ""} width="600" height="452" />
          </div>
        )}
      </div>
    </Container>
  );
};

export default ImageTitle;
