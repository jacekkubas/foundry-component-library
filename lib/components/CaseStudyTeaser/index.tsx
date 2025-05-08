"use client";
import { useEffect, useRef, useState } from "react";
import { translate } from "../../utils";
import styles from "./styles.module.scss";
import Container from "../Container";
import { Case, NextImage } from "../../types";
import useDrag from "../../hooks/useDrag";
import WavyText from "../TextAnimations/WavyText";

const CaseStudyTeaser = ({
  heading,
  cases,
  Image,
}: {
  heading: string;
  cases: Case[];
  Image: NextImage;
}) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);
  const [padding, setPadding] = useState(0);
  const { handleMouseDown, handleMouseMove, handleMouseUp, dragStyle } =
    useDrag(casesRef);

  useEffect(() => {
    if (headingRef.current) {
      setPadding(headingRef.current.offsetLeft);
    }
  }, [headingRef]);

  if (!cases) return;

  return (
    <div className={styles.caseStudyTeaser}>
      <Container>
        <div ref={headingRef}>
          <WavyText className={styles.heading} text={heading}>
            {heading}
          </WavyText>
        </div>
      </Container>

      <div
        className={styles.cases}
        ref={casesRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          ...(dragStyle as React.CSSProperties),
          paddingLeft: padding,
          paddingRight: padding,
        }}
      >
        {cases.map((el) => {
          return (
            <div key={el.id} className={styles.case}>
              <Image
                className={styles.image}
                src={el.case?.mainImage?.sourceUrl || ""}
                alt={el.title}
                fill
              />
              <div className={styles.texts}>
                <div className={styles.caption}>{el.case?.caption}</div>
                <div className={styles.title}>{el.title}</div>
                <a href={el.uri} className={styles.button}>
                  {translate("See More")}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseStudyTeaser;
