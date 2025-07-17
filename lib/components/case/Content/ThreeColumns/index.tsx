import styles from "../styles.module.scss";
import Container from "../../../Container";
import { type ThreeColumns, NextImage } from "../../../../types";
import Left from "./Left";
import Center from "./Center";
import Right from "./Right";

function ThreeColumns({
  section,
  Image,
}: {
  section: ThreeColumns;
  Image: NextImage;
}) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.threeColumns}>
          <div className={styles.column}>
            {section.left && <Left section={section.left[0]} Image={Image} />}
          </div>
          <div className={styles.column}>
            {section.center && (
              <Center section={section.center[0]} Image={Image} />
            )}
          </div>
          <div className={styles.column}>
            {section.right && (
              <Right section={section.right[0]} Image={Image} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ThreeColumns;
