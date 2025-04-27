import Container from "../../Container";
import styles from "./styles.module.scss";
import Arrow from "../../../assets/svg/arrow.svg";

function Contacts({
  title,
  items,
}: {
  title: string;
  items: {
    heading: string;
    subheading: string;
    email: string;
  }[];
}) {
  if (!items) return;

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.boxes}>
          {items.map((item, i) => {
            const { heading, subheading, email } = item;

            return (
              <div className={styles.box} key={heading}>
                <div>
                  <h3 className={styles.heading}>{heading}</h3>
                  <div
                    className={styles.subheading}
                    dangerouslySetInnerHTML={{ __html: subheading }}
                  />
                </div>
                <a className={styles.buttonSecondary} href={`mailto:${email}`}>
                  {i === 0 && "Contact Account"}
                  {i === 1 && "General Contact"}
                  {i === 2 && "Contact HR"}
                  <Arrow />
                </a>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Contacts;
