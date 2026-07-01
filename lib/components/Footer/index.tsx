import Container from "../Container";
import styles from "./styles.module.scss";
import { translate } from "../../utils";
import Logo from "../../assets/svg/footer-logo.svg";
import { NextLink } from "../../types";

function Footer({
  details,
  Link,
  facebook,
  linkedin,
  instagram,
  lang,
}: {
  details: {
    berlinEmail: string;
    zurichEmail: string;
    newyorkEmail: string;
  };
  Link: NextLink;
  facebook: string;
  linkedin: string;
  instagram: string;
  lang?: "DE" | "EN";
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
                  <div className={styles.city}>{translate("Berlin", lang)}</div>
                  <div className={styles.email}>
                    <a href={`mailto:${berlinEmail}`}>{berlinEmail}</a>
                  </div>
                </div>
              )}
              {zurichEmail && (
                <div className={styles.office}>
                  <div className={styles.city}>{translate("Zurich", lang)}</div>
                  <div className={styles.email}>
                    <a href={`mailto:${zurichEmail}`}>{zurichEmail}</a>
                  </div>
                </div>
              )}
              {newyorkEmail && (
                <div className={styles.office}>
                  <div className={styles.city}>
                    {translate("New York", lang)}
                  </div>
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
                <Link href="/hubs">{translate("Service Hubs", lang)}</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/about-us">{translate("About Us", lang)}</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/cases">{translate("Case Studies", lang)}</Link>
              </li>
              {/* <li className={styles.menuItem}>
                <Link href="/team">Team & Careers</Link>
              </li> */}
              <li className={styles.menuItem}>
                <Link href="/news">{translate("News & Insights", lang)}</Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/contact">{translate("Contact", lang)}</Link>
              </li>
            </ul>
            <div className={styles.social}>
              <div className={styles.socialHeading}>
                {translate("Follow Us", lang)}
              </div>
              <ul className={styles.menuSocial}>
                <li className={styles.menuItem}>
                  <Link href={instagram} target="_blank">
                    Instagram
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link href={facebook} target="_blank">
                    Facebook
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link href={linkedin} target="_blank">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>FOUNDRY © {year}</div>
          <div className={styles.bottomLinks}>
            <Link href="/imprint">{translate("Imprint", lang)}</Link>
            <Link href="/terms">{translate("Terms", lang)}</Link>
            <Link href="/privacy-policy">
              {translate("Privacy policy", lang)}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
