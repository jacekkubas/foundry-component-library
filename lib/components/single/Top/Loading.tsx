import styles from "./styles.module.scss";
import Container from "../../Container";

function Top() {
  return (
    <Container>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Loading title...</h1>
      </div>
    </Container>
  );
}

export default Top;
