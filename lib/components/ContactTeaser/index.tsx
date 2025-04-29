import styles from "./styles.module.scss";
import Container from "../Container";
import { translate } from "../../utils";
import { NextLink } from "../../types";

const ContactTeaser = ({
  heading,
  text,
  theme = "yellow",
  buttonText = "Contact Us",
  buttonHref = "/contact",
  Link,
}: {
  heading: string;
  text?: string;
  theme?: "yellow" | "pink";
  buttonText?: string;
  buttonHref?: string;
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
          <Link href={buttonHref} className={styles.button}>
            {translate(buttonText)}
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ContactTeaser;
