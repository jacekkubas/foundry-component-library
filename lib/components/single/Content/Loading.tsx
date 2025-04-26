import Container from "../../Container";
import styles from "./styles.module.scss";

function Content() {
  return (
    <div className={styles.wrapper}>
      <Container>loading content...</Container>
    </div>
  );
}

export default Content;
