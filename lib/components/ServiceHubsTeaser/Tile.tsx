import { MouseEventHandler } from "react";
import styles from "./styles.module.scss";
import Plus from "../../assets/svg/plus.svg";
import { NextLink } from "../../types";
import Arrow from "../../assets/svg/arrow.svg";

const Tile = ({
  text,
  background,
  href,
  onClick,
  Link,
  hoverText,
}: {
  text: string;
  background: "pink" | "yellow" | "brown" | "blue";
  href: string;
  i: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  Link: NextLink;
  hoverText: string;
}) => {
  return (
    <div className={styles.tileWrapper}>
      <Link
        href={href}
        onClick={onClick}
        draggable="false"
        className={`${styles.tile} ${styles[background]}`}>
        <div className={styles.face}>
          <div className={styles.text}>{text}</div>
          <div>
            <Plus />
          </div>
        </div>
        <div className={styles.tails}>
          <div className={styles.tailsText}>{hoverText}</div>
          <div>
            Learn More <Arrow />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Tile;
