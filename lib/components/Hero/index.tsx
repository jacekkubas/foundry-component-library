"use client";
import { useRef } from "react";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage, NextLink } from "../../types";
import { useOnScreen } from "../../hooks/useOnScreen";
import Video from "./Video";

const Hero = ({
  image,
  video,
  text,
  isFullWidth,
  isFirst,
  btn,
  noMarginBottom,
  Link,
  Image,
}: {
  image: string;
  video?: string;
  text: string;
  isFullWidth?: boolean;
  isFirst?: boolean;
  btn?: {
    text?: string;
    href?: string;
  };
  noMarginBottom?: boolean;
  Link: NextLink;
  Image: NextImage;
}) => {
  const sectionRef = useRef(null);
  const onScreen = useOnScreen(sectionRef, "-50%");

  if (!image && !video) return;

  if (isFullWidth) {
    return (
      <div
        ref={sectionRef}
        className={`${styles.hero} ${styles.isFullWidth} ${
          noMarginBottom ? styles.noMarginBottom : ""
        }`}>
        {image && !video && (
          <Image
            className={`${styles.background} ${onScreen ? styles.active : ""}`}
            src={image}
            width="1280"
            height="600"
            alt={text}
          />
        )}
        {video && <Video url={video} />}
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
    <Container noMobilePadding>
      <div
        className={`${styles.hero} ${isFirst ? styles.first : ""} ${
          noMarginBottom ? styles.noMarginBottom : ""
        }`}>
        {image && !video && (
          <Image
            className={`${styles.background} ${onScreen ? styles.active : ""}`}
            src={image}
            width="1280"
            height="600"
            alt={text}
          />
        )}
        {video && <Video url={video} />}
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
