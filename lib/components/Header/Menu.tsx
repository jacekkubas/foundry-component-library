"use client";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
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
  const path = usePathname();
  const currentLang = path.startsWith("/de") ? "DE" : "EN";

  const langPrefix =
    currentLang === "EN" ? "" : `/${currentLang.toLowerCase()}`;

  return (
    <div className={`${styles.menu} ${isOpen}`}>
      <div
        className={styles.close}
        onClick={() => {
          setMenuOpen(false);
        }}>
        <Close />
      </div>
      <div className={styles.menuWrapper}>
        <ul className={styles.menuList}>
          <li className={styles.menuListItem}>
            <Link href={`${langPrefix}/hubs`}>{translate("Service Hubs")}</Link>
          </li>
          <li className={styles.menuListItem}>
            <Link href={`${langPrefix}/cases`}>{translate("Cases")}</Link>
          </li>
          <li className={styles.menuListItem}>
            <Link href={`${langPrefix}/about-us`}>{translate("About Us")}</Link>
          </li>
          <li className={styles.menuListItem}>
            <Link href={`${langPrefix}/contact`}>
              {translate("Contact Us")}
            </Link>
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
            <Link href={`${langPrefix}/team`}>
              {translate("Team & Careers")}
              <Arrow />
            </Link>
          </li>
          <li className={styles.secondaryMenuItem}>
            <Link href={`${langPrefix}/news`}>
              {translate("News & Insights")}
              <Arrow />
            </Link>
          </li>
        </ul>
        <div className={styles.languageSwitcher} aria-label="Language switcher">
          <a
            href={path.replace(`${langPrefix}`, "")}
            className={`${styles.langBtn} ${currentLang === "EN" ? styles.active : ""}`}>
            EN
          </a>
          <div className={styles.divider} />
          <a
            href={currentLang === "DE" ? "" : ` /de${path}`}
            className={`${styles.langBtn} ${currentLang === "DE" ? styles.active : ""}`}>
            DE
          </a>
        </div>
      </div>
    </div>
  );
}

export default Menu;
