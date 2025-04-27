import styles from "./styles.module.scss";
import Plus from "../../assets/svg/plus.svg";

const Tile = ({
  text,
  background,
}: {
  text: string;
  background: "pink" | "yellow" | "brown";
}) => {
  return (
    <div className={`${styles.tile} ${styles[background]}`}>
      <div className={styles.text}>{text}</div>
      <div>
        <Plus />
      </div>
    </div>
  );
};

export default Tile;
