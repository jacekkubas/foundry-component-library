"use client";
import styles from "./styles.module.scss";
import Container from "../Container";
import PopInText from "../TextAnimations/PopInText";
import WavyText from "../TextAnimations/WavyText";
import FadeInText from "../TextAnimations/FadeInText";

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
        {caption && <PopInText className={styles.caption} text={caption} />}
        {heading && (
          <WavyText
            className={`${styles.heading} ${isSmall ? styles.small : ""}`}
            text={heading}
          />
        )}
        {subheading && <div className={styles.subheading}>{subheading}</div>}
        {text && <FadeInText className={styles.text} text={text} />}
      </div>
    </Container>
  );
};

export default TextSection;
