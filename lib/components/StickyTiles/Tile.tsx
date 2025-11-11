import { MouseEventHandler, useRef } from "react";
import styles from "./styles.module.scss";
import Plus from "../../assets/svg/plus.svg";
import { NextLink } from "../../types";
import Arrow from "../../assets/svg/arrow.svg";
import { useScroll } from "motion/react";
import { motion, useTransform } from "framer-motion";

const Tile = ({
  text,
  background,
  href,
  onClick,
  Link,
  hoverText,
}: {
  text: string;
  background: "pink" | "yellow" | "brown" | "blue";
  href: string;
  i: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  Link: NextLink;
  hoverText: string;
  isLast: boolean;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      className={styles.tileWrapper}
      style={{
        scale: scale,
      }}>
      <div className={styles.videoWrapper}>
        <video
          className={styles.video}
          autoPlay
          loop
          playsInline
          src="https://data.foundry.ch/wp-content/uploads/2025/07/foundry-sennheiser-hear-more-thumbnail-video.mp4"
        />
      </div>
      <Link
        href={href}
        onClick={onClick}
        draggable="false"
        className={`${styles.tile} ${styles[background]}`}>
        <div className={styles.face}>
          <div className={styles.text}>{text}</div>
          <div>
            <Plus />
          </div>
        </div>
        <div className={styles.tails}>
          <div className={styles.tailsText}>{hoverText}</div>
          <div>
            Learn More <Arrow />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Tile;
