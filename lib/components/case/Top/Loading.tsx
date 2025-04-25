import styles from "./styles.module.scss";
import Container from "../../Container";
import ShareButton from "../ShareButton";

function Top() {
  const details = [
    {
      heading: "lorem ipsum",
      text: "lorem ipsum",
    },
    {
      heading: "lorem ipsum",
      text: "lorem ipsum",
    },
    {
      heading: "lorem ipsum",
      text: "lorem ipsum",
    },
  ];
  return (
    <div className={styles.top}>
      <div className={`${styles.mainImage} ${styles.loading}`} />
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            <div>
              <div className={styles.caption}>Loading caption...</div>
              <h1 className={styles.title}>Loading title...</h1>
            </div>
            <ShareButton />
          </div>

          <div className={styles.details}>
            {details.map((detail, i) => {
              const { heading, text } = detail;

              return (
                <div key={heading + i} className={styles.detail}>
                  <div className={styles.heading}>{heading}</div>
                  <div className={styles.paragraph}>{text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Top;
