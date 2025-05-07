import { MouseEventHandler } from "react";
import styles from "./styles.module.scss";
import Plus from "../../assets/svg/plus.svg";
import { NextLink } from "../../types";
import { motion } from "framer-motion";

const Tile = ({
  text,
  background,
  href,
  i,
  onClick,
  Link,
}: {
  text: string;
  background: "pink" | "yellow" | "brown" | "blue";
  href: string;
  i: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  Link: NextLink;
}) => {
  return (
    <motion.div
      className={styles.tileWrapper}
      whileHover={{
        scale: 1.08,
        rotate: i % 2 === 0 ? -3 : 3,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
        y: [0, Math.random() * 12 - 6, 0],
        transition: {
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      }}
    >
      <Link
        href={href}
        onClick={onClick}
        draggable="false"
        className={`${styles.tile} ${styles[background]}`}
      >
        <div className={styles.text}>{text}</div>
        <div>
          <Plus />
        </div>
      </Link>
    </motion.div>
  );
};

export default Tile;
