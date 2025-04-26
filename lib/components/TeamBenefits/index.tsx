"use client";
import { useRef } from "react";
import Container from "../Container";
import styles from "./styles.module.scss";
import TextSection from "../TextSection";
import Tile from "./Tile";
import useDrag from "../../hooks/useDrag";

const TeamBenefits = ({ tiles }: { tiles: string[] }) => {
  const sectionRef = useRef(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, dragStyle } =
    useDrag(sectionRef);

  return (
    <div className={styles.benefits}>
      <TextSection caption="join the team" heading="Why Foundry?" />
      <Container>
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

            return <Tile key={tile} text={tile} background={background} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default TeamBenefits;
