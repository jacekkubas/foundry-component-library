import Container from "../Container";
import styles from "./styles.module.scss";
import { translate } from "../../utils";
import Logo from "../../assets/svg/footer-logo.svg";
import { NextLink } from "../../types";

function Footer({
  details,
  Link,
}: {
  details: {
    berlinEmail: string;
    zurichEmail: string;
    newyorkEmail: string;
  };
  Link: NextLink;
}) {
  const { berlinEmail, zurichEmail, newyorkEmail } = details;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={`${styles.footerWrapper}`}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <Logo />
              <div className={styles.logoText}>
                {translate("Inspiring positive change.")}
              </div>
            </div>
            <div className={styles.offices}>
              {berlinEmail && (
                <div className={styles.office}>
                  <div className={styles.city}>{translate("Berlin")}</div>
                  <div className={styles.email}>
                    <a href={`mailto:${berlinEmail}`}>{berlinEmail}</a>
                  </div>
                </div>
              )}
              {zurichEmail && (
                <div className={styles.office}>
                  <div className={styles.city}>{translate("Zurich")}</div>
                  <div className={styles.email}>
                    <a href={`mailto:${zurichEmail}`}>{zurichEmail}</a>
                  </div>
                </div>
              )}
              {newyorkEmail && (
                <div className={styles.office}>
                  <div className={styles.city}>{translate("New York")}</div>
                  <div className={styles.email}>
                    <a href={`mailto:${newyorkEmail}`}>{newyorkEmail}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <ul className={styles.menu}>
              <li className={styles.menuItem}>
                <Link href="/hubs">Service Hubs</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/about-us">About Us</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/cases">Case Studies</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/team">Team & Careers</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/news">News & Insights</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
            <div className={styles.social}>
              <div className={styles.socialHeading}>Follow Us</div>
              <ul className={styles.menuSocial}>
                <li className={styles.menuItem}>
                  <Link href="https://instagram.com">Instagram</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link href="https://facebook.com">Facebook</Link>
                </li>
                <li className={styles.menuItem}>
                  <Link href="https://linkedin.com">LinkedIn</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>FOUNDRY © {year}</div>
          <div className={styles.bottomLinks}>
            <Link href="/imprint">{translate("Imprint")}</Link>
            <Link href="/terms">{translate("Terms")}</Link>
            <Link href="/privacy-policy">{translate("Privacy policy")}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
