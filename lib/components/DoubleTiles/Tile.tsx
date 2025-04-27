import styles from "./styles.module.scss";
import Plus from "../../assets/svg/plus.svg";

const Tile = ({
  heading,
  text,
  background,
}: {
  heading: string;
  text: string;
  background: "pink" | "yellow" | "brown" | "gray";
}) => {
  return (
    <div className={`${styles.tile} ${styles[background]}`}>
      <div className={styles.sideOne}>
        <div className={styles.heading}>{heading}</div>
        <div>
          <Plus />
        </div>
      </div>
      <div className={styles.sideTwo}>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

export default Tile;
