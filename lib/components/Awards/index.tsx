"use client";
import { useRef } from "react";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage } from "../../types";
import useDrag from "../../hooks/useDrag";

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

  console.log(awards);

  if (!awards) return;

  return (
    <div className={styles.awards}>
      <Container>
        {heading && <div className={styles.heading}>{heading}</div>}
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
              <div key={heading || "" + i} className={styles.award}>
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
    </div>
  );
};

export default Awards;
