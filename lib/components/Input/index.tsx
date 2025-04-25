import React from "react";
import styles from "./styles.module.scss";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.input} {...props} />;
}
