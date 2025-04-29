import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage, NextLink } from "../../types";

const Hero = ({
  image,
  text,
  isFullWidth,
  isFirst,
  btn,
  Link,
  Image,
}: {
  image: string;
  text: string;
  isFullWidth?: boolean;
  isFirst?: boolean;
  btn?: {
    text?: string;
    href?: string;
  };
  Link: NextLink;
  Image: NextImage;
}) => {
  console.log(image);
  if (!image) return;

  if (isFullWidth) {
    return (
      <div className={`${styles.hero} ${styles.isFullWidth}`}>
        <Image
          className={styles.background}
          src={image}
          width="1280"
          height="600"
          alt={text}
        />
        <div className={styles.texts}>
          {text && <div className={styles.heading}>{text}</div>}
          {btn && (
            <Link className={styles.button} href={btn.href || ""}>
              {btn.text}
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className={`${styles.hero} ${isFirst ? styles.first : ""}`}>
        <Image
          className={styles.background}
          src={image}
          width="1280"
          height="600"
          alt={text}
        />
        <div className={styles.texts}>
          {text && <div className={styles.heading}>{text}</div>}
          {btn && (
            <Link className={styles.button} href={btn.href || ""}>
              {btn.text}
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Hero;
