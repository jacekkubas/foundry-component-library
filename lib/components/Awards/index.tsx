"use client";
import { useRef } from "react";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage } from "../../types";
import useDrag from "../../hooks/useDrag";
import WavyText from "../TextAnimations/WavyText";
import { motion } from "framer-motion";

const Awards = ({
  heading,
  awards,
  Image,
}: {
  heading?: string;
  awards?: {
    image?: {
      sourceUrl: string;
    };
    heading?: string;
    text?: string;
  }[];
  Image: NextImage;
}) => {
  const sectionRef = useRef(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, dragStyle } =
    useDrag(sectionRef);

  if (!awards) return;

  return (
    <motion.div
      className={styles.awards}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
      }}
    >
      <Container>
        {heading && <WavyText className={styles.heading} text={heading} />}
      </Container>
      <Container noMobilePadding>
        <div
          ref={sectionRef}
          className={styles.items}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={dragStyle as React.CSSProperties}
        >
          {awards.map((award, i) => {
            const { image, heading, text } = award;

            if (!image) return;

            return (
              <div key={image.sourceUrl + i} className={styles.award}>
                <div className={styles.image}>
                  {image && <Image src={image?.sourceUrl} alt="" fill />}
                </div>
                {heading && <div className={styles.text}>{heading}</div>}
                {text && <div className={styles.client}>{text}</div>}
              </div>
            );
          })}
        </div>
      </Container>
    </motion.div>
  );
};

export default Awards;
