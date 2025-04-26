import React from "react";
import styles from "./styles.module.scss";

const Tile = ({
  text,
  background,
}: {
  text: string;
  background: "pink" | "yellow" | "brown" | "blue";
}) => {
  return (
    <div className={`${styles.tile} ${styles[background]}`}>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Tile;
