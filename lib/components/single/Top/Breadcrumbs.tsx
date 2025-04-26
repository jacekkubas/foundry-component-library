import styles from "./styles.module.scss";
import { translate } from "../../../utils";
import { NextLink } from "../../../types";

const Breadcrumbs = ({
  isCase,
  title,
  Link,
}: {
  isCase: boolean;
  title: string;
  Link: NextLink;
}) => {
  return (
    <nav className={styles.breadcrumbs}>
      <div className={styles.link}>
        <Link href="/">{translate("Home")}</Link>
      </div>
      {isCase && (
        <div className={styles.link}>
          <Link href="/cases">{translate("Cases")}</Link>
        </div>
      )}
      {!isCase && (
        <div className={styles.link}>
          <Link href="/news">{translate("News")}</Link>
        </div>
      )}
      {title && <div className={styles.link}>{title}</div>}
    </nav>
  );
};

export default Breadcrumbs;
