import { MouseEventHandler } from "react";
import styles from "./styles.module.scss";
import Plus from "../../assets/svg/plus.svg";
import { NextLink } from "../../types";

const Tile = ({
  text,
  background,
  href,
  onClick,
  Link,
}: {
  text: string;
  background: "pink" | "yellow" | "brown" | "blue";
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  Link: NextLink;
}) => {
  return (
    <Link
      className={`${styles.tile} ${styles[background]}`}
      href={href}
      onClick={onClick}
      draggable="false"
    >
      <div className={styles.text}>{text}</div>
      <div>
        <Plus />
      </div>
    </Link>
  );
};

export default Tile;
