import Container from "../Container";
import styles from "./styles.module.scss";

const TheamPhotos = () => {
  const people = [
    {
      name: "John Doe",
      position: "loading...",
    },
    {
      name: "Loading name...",
      position: "loading...",
    },
    {
      name: "Elisabeth Warden",
      position: "loading...",
    },
  ];

  return (
    <Container>
      <div className={styles.heading}>{"Our Lovely Team"}</div>
      <div className={styles.people}>
        {people.map((person) => {
          const { name, position } = person;

          return (
            <div key={name} className={styles.person}>
              <div className={`${styles.image} ${styles.loading}`}></div>
              <div className={styles.name}>{name.replace("<br />", "\n")}</div>
              <div className={styles.position}>
                {position.replace("<br />", "\n")}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default TheamPhotos;
