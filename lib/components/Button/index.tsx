import styles from "./styles.module.scss";

export function Button({ text }: { text: string }) {
  return <button className={styles.button}>{text}</button>;
}
