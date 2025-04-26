import Container from "../Container";
import TextSection from "../TextSection";
import styles from "./styles.module.scss";
import Tile from "./Tile";

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
  return (
    <div className={styles.doubleTiles}>
      <TextSection caption="PROCESS" heading={heading} />
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.tiles}>
            {tiles.map((tile, i) => {
              let background: "pink" | "yellow" | "brown" | "gray" = "pink";
              if (i % 3 === 1) background = "gray";
              if (i % 3 === 2) background = "brown";

              return (
                <Tile
                  key={tile.text}
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
