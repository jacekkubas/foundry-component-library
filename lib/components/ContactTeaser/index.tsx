import styles from "./styles.module.scss";
import Container from "../Container";
import { translate } from "../../utils";
import { NextLink } from "../../types";

const ContactTeaser = ({
  heading,
  text,
  theme = "yellow",
  Link,
}: {
  heading: string;
  text?: string;
  theme?: "yellow" | "pink";
  Link: NextLink;
}) => {
  return (
    <div className={`${styles.contactTeaser} ${styles[theme]}`}>
      <Container>
        <div className={styles.wrapper}>
          {heading && (
            <div className={`${styles.heading} ${!text ? styles.margin : ""}`}>
              {heading}
            </div>
          )}
          {text && <div className={styles.text}>{text}</div>}
          <Link href="/contact" className={styles.button}>
            {translate("Contact Us")}
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ContactTeaser;
