import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";
import { translate } from "../../utils";
import Arrow from "../../assets/svg/arrow.svg";
import Close from "../../assets/svg/close.svg";
import { NextLink } from "../../types";

function Menu({
  isOpen,
  setMenuOpen,
  Link,
}: {
  isOpen: string;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  Link: NextLink;
}) {
  return (
    <div className={`${styles.menu} ${isOpen}`}>
      <div
        className={styles.close}
        onClick={() => {
          setMenuOpen(false);
        }}
      >
        <Close />
      </div>
      <div className={styles.menuWrapper}>
        <ul className={styles.menuList}>
          <li className={styles.menuListItem}>
            <Link href="/hubs">{translate("Service Hubs")}</Link>
          </li>
          <li className={styles.menuListItem}>
            <Link href="/cases">{translate("Work")}</Link>
          </li>
          <li className={styles.menuListItem}>
            <Link href="/about-us">{translate("About Us")}</Link>
          </li>
          <li className={styles.menuListItem}>
            <Link href="/contact">{translate("Contact Us")}</Link>
          </li>
        </ul>
        <ul className={styles.menuSecondary}>
          {/* <li className={styles.secondaryMenuItem}>
            <Container>
              <Link href="/contact">
                {translate("Work with Us")}
                <Arrow />
              </Link>
            </Container>
          </li> */}
          {/* <li className={styles.secondaryMenuItem}>
            <Container>
              <Link href="/team#careers">
                {translate("Join the Team")}
                <Arrow />
              </Link>
            </Container>
          </li> */}
          <li className={styles.secondaryMenuItem}>
            <Link href="/team">
              {translate("Team & Careers")}
              <Arrow />
            </Link>
          </li>
          <li className={styles.secondaryMenuItem}>
            <Link href="/news">
              {translate("News & Insights")}
              <Arrow />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
