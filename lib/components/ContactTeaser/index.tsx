import styles from "./styles.module.scss";
import Container from "../Container";
import { translate } from "../../utils";
import { NextLink } from "../../types";
import WavyText from "../TextAnimations/WavyText";
import FadeInText from "../TextAnimations/FadeInText";

const ContactTeaser = ({
  heading,
  text,
  theme = "yellow",
  buttonText = "Contact Us",
  buttonHref = "/contact",
  alternate,
  Link,
}: {
  heading: string;
  text?: string;
  theme?: "yellow" | "pink";
  buttonText?: string;
  buttonHref?: string;
  alternate?: boolean;
  Link: NextLink;
}) => {
  return (
    <div className={`${styles.contactTeaser} ${styles[theme]}`}>
      <Container>
        <div className={styles.wrapper}>
          {heading && (
            <WavyText
              className={`${styles.heading} ${!text ? styles.margin : ""}`}
              text={heading}
              alternate={alternate}
            />
          )}
          {text && <FadeInText className={styles.text} text={text} />}
          <Link href={buttonHref} className={styles.button}>
            {translate(buttonText)}
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ContactTeaser;
