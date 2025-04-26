import styles from "./styles.module.scss";
import Container from "../Container";

const Hero = ({
  isFullWidth,
  isFirst,
}: {
  isFullWidth?: boolean;
  isFirst?: boolean;
}) => {
  if (isFullWidth) {
    return (
      <div className={`${styles.hero} ${styles.isFullWidth} ${styles.loading}`}>
        <div className={styles.texts}>
          <div className={styles.heading}>Loading text...</div>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div
        className={`${styles.hero} ${isFirst ? styles.first : ""} ${
          styles.loading
        }`}
      >
        <div className={styles.texts}>
          <div className={styles.heading}>Loading text...</div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
