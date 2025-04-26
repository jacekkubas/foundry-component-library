"use client";
import { useState, useRef } from "react";
import TextSection from "../TextSection";
import styles from "./styles.module.scss";
import Container from "../Container";
import { motion } from "framer-motion";
import { NextImage } from "../../types";

const Management = ({
  caption,
  heading,
  items,
  Image,
}: {
  caption: string;
  heading: string;
  items?: {
    image?: {
      sourceUrl: string;
    };
    quote?: string;
    name?: string;
    position?: string;
  }[];
  Image: NextImage;
}) => {
  const [activePerson, setActivePerson] = useState(0);
  // const [height, setHeight] = useState<number | undefined>();
  const contentRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect(() => {
  //   if (contentRef.current) {
  //     setHeight(contentRef.current.offsetHeight);
  //   }
  // }, [activePerson]);

  if (!items) return;
  return (
    <div className={styles.management}>
      <TextSection caption={caption} heading={heading} />
      <Container>
        <motion.div
          // animate={{ height }}
          // transition={{ duration: 0.4 }}
          className={styles.wrapper}
          style={{ overflow: "hidden" }}
        >
          <div ref={contentRef}>
            <motion.div
              key={items[activePerson]?.name}
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: -20 }}
              // transition={{ duration: 0.4 }}
              className={styles.person}
            >
              <div className={styles.image}>
                <Image
                  src={items[activePerson]?.image?.sourceUrl || ""}
                  alt={items[activePerson]?.name || ""}
                  width={600}
                  height={800}
                />
              </div>
              <div className={styles.texts}>
                <div className={styles.quote}>
                  &quot;{items[activePerson]?.quote}&quot;
                </div>
                <div className={styles.name}>{items[activePerson]?.name}</div>
                <div className={styles.position}>
                  {items[activePerson]?.position}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className={styles.indicators}>
          {items.map((el, i) => {
            return (
              <div
                key={el.name}
                className={`${styles.indicator} ${
                  activePerson === i ? styles.active : ""
                }`}
                onClick={() => {
                  setActivePerson(i);
                }}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Management;
