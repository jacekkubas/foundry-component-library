import Container from "../Container";
import styles from "./styles.module.scss";
import { NextLink } from "../../types";

const AgencyNumbers = ({
  heading,
  items,
  Link,
}: {
  heading: string;
  items: {
    text?: string;
    number?: string;
  }[];
  Link: NextLink;
}) => {
  return (
    <div className={styles.numbers}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.headingWrapper}>
            {heading && (
              <div
                className={styles.heading}
                dangerouslySetInnerHTML={{ __html: heading }}
              />
            )}
            {Link && (
              <Link
                className={`${styles.button} ${styles.desktop}`}
                href="/about-us"
              >
                About Us
              </Link>
            )}
          </div>
          <div className={styles.columns}>
            {items.map((item) => {
              return (
                <div key={item.text} className={styles.item}>
                  <div className={styles.number}>{item.number}</div>
                  <div className={styles.description}>{item.text}</div>
                </div>
              );
            })}
          </div>
          {Link && (
            <Link
              className={`${styles.button} ${styles.mobile}`}
              href="/about-us"
            >
              About Us
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AgencyNumbers;
