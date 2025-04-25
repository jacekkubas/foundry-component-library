import Container from "../../../Container";
import styles from "./styles.module.scss";
import { translate } from "../../../../utils";

const Results = ({
  section: { context, approach, outcome },
}: {
  section: {
    context?: string;
    approach?: string;
    outcome?: string;
  };
}) => {
  if (!context && !approach && !outcome) return;

  return (
    <div className={styles.results}>
      <Container>
        <div className={styles.wrapper}>
          {context && (
            <div className={styles.column}>
              <div className={styles.heading}>{translate("Context")}</div>
              <div>{context}</div>
            </div>
          )}
          {approach && (
            <div className={styles.column}>
              <div className={styles.heading}>{translate("Approach")}</div>
              <div>{approach}</div>
            </div>
          )}
          {outcome && (
            <div className={styles.column}>
              <div className={styles.heading}>{translate("Outcome")}</div>
              <div>{outcome}</div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Results;
