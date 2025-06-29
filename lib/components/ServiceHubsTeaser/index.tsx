"use client";
import { useRef } from "react";
import Container from "../Container";
import styles from "./styles.module.scss";
import TextSection from "../TextSection";
import Tile from "./Tile";
import { NextLink } from "../../types";
import { motion } from "framer-motion";

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
  const wrapperRef = useRef(null);
  const dragStarted = useRef(false);

  return (
    <div className={styles.benefits}>
      <TextSection caption={caption} heading={heading} text={text} isSmall />
      <Container noMobilePadding>
        <div className={styles.wrapper} ref={wrapperRef}>
          <motion.div
            className={styles.tiles}
            drag="x"
            dragConstraints={wrapperRef}
            onDragStart={() => (dragStarted.current = true)}
            onDragEnd={() => {
              setTimeout(() => {
                dragStarted.current = false;
              }, 0);
            }}
          >
            {tiles.map((tile, i) => {
              let background: "pink" | "yellow" | "brown" | "blue" = "pink";
              if (i % 4 === 1) background = "yellow";
              if (i % 4 === 2) background = "brown";
              if (i % 4 === 3) background = "blue";

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
