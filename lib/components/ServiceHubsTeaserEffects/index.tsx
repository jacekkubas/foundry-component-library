"use client";
import { useRef } from "react";
import Container from "../Container";
import styles from "./styles.module.scss";
import TextSection from "../TextSection";
import TileGlass from "./TileGlass";
import TileBalls from "./TileBalls";
// import TileRays from "./TileRays";
import { NextLink } from "../../types";

const ServiceHubsTeaserEffects = ({
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
          <div className={styles.tiles}>
            {tiles.map((tile, i) => {
              const colors: Array<"pink" | "yellow" | "brown" | "blue"> = [
                "pink",
                "yellow",
                "brown",
                "blue",
              ];
              const background = colors[i % colors.length];

              return (
                <div className={styles.tileWrapper} key={tile.id}>
                  <Link
                    href={tile.uri}
                    className={`${styles.tile} ${styles[background]}`}>
                    {i === 0 && <TileGlass />}
                    {i === 1 && <TileBalls />}
                    {/* {i === 2 && <TileRays />} */}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceHubsTeaserEffects;
