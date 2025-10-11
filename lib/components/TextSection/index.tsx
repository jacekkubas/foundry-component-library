"use client";
import styles from "./styles.module.scss";
import Container from "../Container";

const TextSection = ({
  caption,
  heading,
  subheading,
  text,
  align,
  theme,
  isSmall,
}: {
  caption?: string;
  heading?: string;
  subheading?: string;
  text?: string;
  align?: "left" | "center" | "right";
  theme?: "white" | "blue";
  isSmall?: boolean;
}) => {
  const alignStyle = align ? styles[align] : "";
  const themeStyle = theme ? styles[theme] : "";

  return (
    <Container>
      <div className={`${styles.section} ${alignStyle} ${themeStyle}`}>
        {caption && <div className={styles.caption}>{caption}</div>}
        {heading && (
          <div className={`${styles.heading} ${isSmall ? styles.small : ""}`}>
            {heading}
          </div>
        )}
        {subheading && <div className={styles.subheading}>{subheading}</div>}
        {text && <div className={styles.text}>{text}</div>}
      </div>
    </Container>
  );
};

export default TextSection;
