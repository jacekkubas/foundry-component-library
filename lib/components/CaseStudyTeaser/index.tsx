"use client";
import { useRef } from "react";
import { translate } from "../../utils";
import styles from "./styles.module.scss";
import Container from "../Container";
import { Case, NextImage } from "../../types";
import { motion } from "framer-motion";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragStarted = useRef(false);

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
      <Container>
        <div ref={wrapperRef} style={{ width: "100%" }}>
          <motion.div
            className={styles.cases}
            drag="x"
            dragConstraints={wrapperRef}
            onDragStart={() => (dragStarted.current = true)}
            onDragEnd={() => {
              setTimeout(() => {
                dragStarted.current = false;
              }, 0);
            }}
          >
            {cases.map((el) => {
              const { thumbnailImage, mainImage } = el.case;

              return (
                <div key={el.id} className={styles.case}>
                  <Image
                    className={styles.image}
                    src={
                      thumbnailImage?.sourceUrl || mainImage?.sourceUrl || ""
                    }
                    alt={el.title}
                    fill
                  />
                  <div className={styles.texts}>
                    <div className={styles.caption}>{el.case?.caption}</div>
                    <div className={styles.title}>{el.title}</div>
                    <a
                      href={el.uri}
                      className={styles.button}
                      onClick={(e) => {
                        if (dragStarted.current) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      {translate("See More")}
                    </a>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default CaseStudyTeaser;
