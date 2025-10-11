"use client";
import { useRef, useEffect } from "react";
import Container from "../Container";
import styles from "./styles.module.scss";
import TextSection from "../TextSection";
import Tile from "./Tile";
import { NextLink } from "../../types";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";

const SCROLL_DISTANCE = -500;

const ServiceHubsTeaser = ({
  caption,
  heading,
  text,
  tiles,
  Link,
}: {
  caption: string;
  heading: string;
  text: string;
  tiles: {
    id: string;
    uri: string;
    title: string;
    customFieldsHub: {
      heading: string;
    };
  }[];
  Link: NextLink;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragStarted = useRef(false);

  const x = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 120,
    damping: 20,
    mass: 0.1,
  });

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const scrollOffset = latest * SCROLL_DISTANCE;
      if (!dragStarted.current) {
        x.set(scrollOffset);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, x]);

  return (
    <div className={styles.benefits}>
      <TextSection caption={caption} heading={heading} text={text} isSmall />
      <Container noMobilePadding>
        <div className={styles.wrapper} ref={wrapperRef}>
          <motion.div
            className={styles.tiles}
            drag="x"
            dragConstraints={wrapperRef}
            style={{ x: smoothX }}
            dragMomentum={true}
            onDragStart={() => (dragStarted.current = true)}
            onDragEnd={() => {
              setTimeout(() => {
                dragStarted.current = false;
              }, 0);
            }}>
            {tiles.map((tile, i) => {
              const colors: Array<"pink" | "yellow" | "brown" | "blue"> = [
                "pink",
                "yellow",
                "brown",
                "blue",
              ];
              const background = colors[i % colors.length];

              return (
                <Tile
                  key={tile.id}
                  text={tile.title}
                  hoverText={tile.customFieldsHub.heading}
                  background={background}
                  href={tile.uri}
                  i={i}
                  Link={Link}
                  onClick={(e) => {
                    if (dragStarted.current) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceHubsTeaser;
