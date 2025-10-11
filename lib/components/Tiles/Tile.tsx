import styles from "./styles.module.scss";
import Plus from "../../assets/svg/plus.svg";

const Tile = ({
  text,
  background,
  hoverText,
}: {
  text: string;
  hoverText: string;
  background: "pink" | "yellow" | "brown";
  i: number;
}) => {
  return (
    <div className={`${styles.tile} ${styles[background]}`}>
      <div className={styles.face}>
        <div className={styles.text}>{text}</div>
        <div>
          <Plus />
        </div>
      </div>
      <div className={styles.tails}>
        <div className={styles.tailsText}>{hoverText}</div>
      </div>
    </div>
  );
};

export default Tile;
