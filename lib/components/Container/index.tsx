import React from "react";
import { CSSProperties } from "react";
import styles from "./styles.module.scss";

const Container = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <div className={styles.container} style={{ ...style }}>
      {children}
    </div>
  );
};

export default Container;
