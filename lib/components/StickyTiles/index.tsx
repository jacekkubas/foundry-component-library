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
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.benefits}>
      <TextSection caption={caption} heading={heading} text={text} isSmall />
      <Container noMobilePadding>
        <div className={styles.wrapper} ref={wrapperRef}>
          <motion.div className={styles.tiles}>
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
                  isLast={i === tiles.length - 1}
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
