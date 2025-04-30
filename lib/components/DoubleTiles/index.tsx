"use client";
import { useRef } from "react";
import Container from "../Container";
import TextSection from "../TextSection";
import styles from "./styles.module.scss";
import Tile from "./Tile";
import useDrag from "../../hooks/useDrag";

const DoubleTiles = ({
  heading,
  tiles,
}: {
  heading: string;
  tiles: {
    heading?: string;
    text?: string;
  }[];
}) => {
  const sectionRef = useRef(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, dragStyle } =
    useDrag(sectionRef);

  if (!tiles) return;

  return (
    <div className={styles.doubleTiles}>
      <TextSection caption="PROCESS" heading={heading} />
      <Container noMobilePadding>
        <div className={styles.wrapper}>
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
              let background: "pink" | "yellow" | "brown" | "gray" = "pink";
              if (i % 3 === 1) background = "gray";
              if (i % 3 === 2) background = "brown";

              return (
                <Tile
                  key={background + i}
                  heading={tile.heading || ""}
                  text={tile.text || ""}
                  background={background}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DoubleTiles;
