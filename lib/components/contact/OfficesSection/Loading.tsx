import Container from "../../Container";
import Offices from "../Offices/Loading";
import styles from "./styles.module.scss";

const index = () => {
  return (
    <div className={styles.officesSection}>
      <Container>
        <Offices />
      </Container>
    </div>
  );
};

export default index;
