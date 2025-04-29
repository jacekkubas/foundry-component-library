import React from "react";
import { CSSProperties } from "react";
import styles from "./styles.module.scss";

const Container = ({
  children,
  style,
  noMobilePadding,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
  noMobilePadding?: boolean;
}) => {
  return (
    <div
      className={`${styles.container} ${
        noMobilePadding ? styles.noMobilePadding : ""
      }`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default Container;
