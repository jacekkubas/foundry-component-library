"use client";
import { useRef } from "react";
import Container from "../Container";
import styles from "./styles.module.scss";
import TextSection from "../TextSection";
import Tile from "./Tile";
import useDrag from "../../hooks/useDrag";
import { NextLink } from "../../types";

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
  }[];
  Link: NextLink;
}) => {
  const sectionRef = useRef(null);
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    preventedClick,
    dragStyle,
  } = useDrag(sectionRef);

  return (
    <div className={styles.benefits}>
      <TextSection caption={caption} heading={heading} text={text} isSmall />
      <Container noMobilePadding>
        <div
          ref={sectionRef}
          className={styles.tiles}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={dragStyle as React.CSSProperties}
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
                background={background}
                href={tile.uri}
                onClick={preventedClick}
                Link={Link}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default ServiceHubsTeaser;
