import styles from "./styles.module.scss";
import Container from "../../Container";

function Accounts({
  data,
}: {
  data: {
    bankTitle: string;
    berlinHeading: string;
    berlinDetails: string;
    swissHeading: string;
    swissDetails: string;
  };
}) {
  if (!data) return;

  const {
    bankTitle,
    berlinHeading,
    berlinDetails,
    swissHeading,
    swissDetails,
  } = data;

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>{bankTitle}</h2>
        <div className={styles.wrapper}>
          <div className={styles.column}>
            <div className={`${styles.subheading}`}>{berlinHeading}</div>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: berlinDetails }}
            />
          </div>
          <div className={styles.column}>
            <div className={`${styles.subheading}`}>{swissHeading}</div>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: swissDetails }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Accounts;
