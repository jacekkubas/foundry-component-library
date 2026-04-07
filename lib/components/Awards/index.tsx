"use client";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage } from "../../types";
import WavyText from "../TextAnimations/WavyText";
import { motion } from "framer-motion";
import FadeInText from "../TextAnimations/FadeInText";

// Infinite marquee animation settings
const marqueeVariants = {
  animate: {
    x: [0, -"100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
};

const Awards = ({
  heading,
  text,
  awards,
  Image,
}: {
  heading?: string;
  text?: string;
  awards?: {
    image?: {
      sourceUrl: string;
    };
    heading?: string;
    text?: string;
  }[];
  Image: NextImage;
}) => {
  if (!awards) return null;

  // Duplicate awards to create seamless looping
  const marqueeItems = awards.length < 5 ? awards : [...awards, ...awards];

  return (
    <motion.div
      className={styles.awards}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>
      <Container>
        {heading && (
          <WavyText
            className={`${styles.heading} ${text ? "" : styles.morePadding}`}
            text={heading}
          />
        )}
        {text && <FadeInText className={styles.subheading} text={text} />}
      </Container>
      <Container noMobilePadding>
        <div className={styles.marqueeWrapper}>
          <motion.div
            className={`${styles.marquee} ${awards.length < 5 ? styles.noAnimation : ""}`}
            variants={marqueeVariants}
            animate={awards.length < 5 ? "" : "animate"}>
            {marqueeItems.map((award, i) => {
              const { image, heading, text } = award;
              if (!image) return null;

              return (
                <div key={image.sourceUrl + i} className={styles.award}>
                  <div className={styles.image}>
                    {image && <Image src={image.sourceUrl} alt="" fill />}
                  </div>
                  {heading && <div className={styles.text}>{heading}</div>}
                  {text && <div className={styles.client}>{text}</div>}
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Awards;
