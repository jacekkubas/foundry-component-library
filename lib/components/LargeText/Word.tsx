import React from "react";
import { MotionValue, useTransform, motion } from "framer-motion";
import styles from "./styles.module.scss";

const Word = ({
  text,
  range,
  progress,
}: {
  text: string;
  range: number[];
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className={styles.wordWrapper}>
      <motion.span className={styles.word} style={{ opacity: opacity }}>
        {text}
      </motion.span>
      <span className={styles.ghostWord}>{text}</span>
    </span>
  );
};

export default Word;
