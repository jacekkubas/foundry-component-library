import Container from "../../../Container";
import styles from "./styles.module.scss";

const Numbers = ({
  section: { number1, text1, number2, text2, number3, text3 },
}: {
  section: {
    number1?: string;
    text1?: string;
    number2?: string;
    text2?: string;
    number3?: string;
    text3?: string;
  };
}) => {
  if (!number1 && !text1 && !number2 && !text2 && !number3 && !text3) return;

  return (
    <div className={styles.numbers}>
      <Container>
        <div className={styles.wrapper}>
          {(number1 || text1) && (
            <div className={styles.column}>
              {number1 && <div className={styles.number}>{number1}</div>}
              {text1 && <div className={styles.text}>{text1}</div>}
            </div>
          )}
          {(number2 || text2) && (
            <div className={styles.column}>
              {number2 && <div className={styles.number}>{number2}</div>}
              {text2 && <div className={styles.text}>{text2}</div>}
            </div>
          )}
          {(number3 || text3) && (
            <div className={styles.column}>
              {number3 && <div className={styles.number}>{number3}</div>}
              {text3 && <div className={styles.text}>{text3}</div>}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Numbers;
