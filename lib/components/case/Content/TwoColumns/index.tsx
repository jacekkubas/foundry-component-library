import styles from "../styles.module.scss";
import Container from "../../../Container";
import { type TwoColumns, NextImage } from "../../../../types";
import Left from "./Left";
import Right from "./Right";

function TwoColumns({
  section,
  Image,
}: {
  section: TwoColumns;
  Image: NextImage;
}) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.twoColumns}>
          <div className={styles.column}>
            {section.left && <Left section={section.left[0]} Image={Image} />}
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

export default TwoColumns;
