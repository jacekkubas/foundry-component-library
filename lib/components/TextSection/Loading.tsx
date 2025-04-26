import styles from "./styles.module.scss";
import Container from "../Container";

const TextSection = ({
  caption,
  heading,
  subheading,
  text,
  align,
  theme,
}: {
  caption?: boolean;
  heading?: boolean;
  subheading?: boolean;
  text?: boolean;
  align?: "left" | "center" | "right";
  theme?: "white" | "blue";
}) => {
  const alignStyle = align ? styles[align] : "";
  const themeStyle = theme ? styles[theme] : "";

  return (
    <Container>
      <div className={`${styles.section} ${alignStyle} ${themeStyle}`}>
        {caption && <div className={styles.caption}>Loading caption...</div>}
        {heading && <div className={styles.heading}>Loading heading...</div>}
        {subheading && (
          <div className={styles.subheading}>Loading subheading...</div>
        )}
        {text && <div className={styles.text}>Loading text...</div>}
      </div>
    </Container>
  );
};

export default TextSection;
