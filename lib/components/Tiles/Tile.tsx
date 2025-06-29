import styles from "./styles.module.scss";
import Plus from "../../assets/svg/plus.svg";
import { motion } from "framer-motion";

const Tile = ({
  text,
  background,
  hoverText,
  i,
}: {
  text: string;
  hoverText: string;
  background: "pink" | "yellow" | "brown";
  i: number;
}) => {
  return (
    <motion.div
      className={`${styles.tile} ${styles[background]}`}
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
      <div className={styles.face}>
        <div className={styles.text}>{text}</div>
        <div>
          <Plus />
        </div>
      </div>
      <div className={styles.tails}>
        <div className={styles.tailsText}>{hoverText}</div>
      </div>
    </motion.div>
  );
};

export default Tile;
