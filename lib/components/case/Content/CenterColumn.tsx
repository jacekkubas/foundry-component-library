import Container from "../../Container";
import styles from "./styles.module.scss";
import { type CenterColumn } from "../../../types";

function CenterColumn({ section }: { section: CenterColumn }) {
  return (
    <section className={styles.section}>
      <Container>
        <div
          className={styles.wysywig}
          dangerouslySetInnerHTML={{ __html: section.text }}
        />
      </Container>
    </section>
  );
}

export default CenterColumn;
