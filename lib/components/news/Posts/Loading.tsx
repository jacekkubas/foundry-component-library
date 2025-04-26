import styles from "./styles.module.scss";
import Container from "../../Container";

const Posts = () => {
  const posts = [
    {
      id: "post1",
    },
    {
      id: "post2",
    },
    {
      id: "post3",
    },
    {
      id: "post4",
    },
    {
      id: "post5",
    },
    {
      id: "post6",
    },
  ];
  return (
    <section className={styles.section}>
      <Container>
        {posts.map((item) => {
          return (
            <div key={item.id} className={styles.item}>
              <div className={styles.wrapper}>
                <div className={`${styles.image} ${styles.imageloading}`} />
                <div className={styles.texts}>
                  <span className={styles.date}>date...</span>
                  <h2 className={styles.title}>
                    <a>Loading title...</a>
                  </h2>
                  <div className={styles.excerpt}>Loading excerpt...</div>
                  <div className={styles.button}>
                    <a>Read more</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
};

export default Posts;
