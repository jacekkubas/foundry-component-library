"use client";
import { useRef } from "react";
import styles from "./styles.module.scss";
import Container from "../Container";
import TextSection from "../TextSection";
import Tile from "./Tile";
import useDrag from "../../hooks/useDrag";

const Tiles = ({
  tiles,
}: {
  tiles: {
    heading?: string;
    hoverText?: string;
  }[];
}) => {
  const sectionRef = useRef(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, dragStyle } =
    useDrag(sectionRef);

  if (!tiles) return;

  return (
    <Container>
      <TextSection
        caption="team & careers"
        heading="Agile global experts who would love to collaborate with you."
      />
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
          let background: "pink" | "yellow" | "brown" = "pink";
          if (i % 3 === 1) background = "yellow";
          if (i % 3 === 2) background = "brown";

          return (
            <Tile
              key={tile.heading}
              text={tile.heading || ""}
              hoverText={tile.hoverText || ""}
              background={background}
              i={i}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Tiles;
