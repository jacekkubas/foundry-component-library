import styles from "./styles.module.scss";
import Container from "../../Container";
import { translate } from "../../../utils";
import { NextImage, NextLink, Post } from "../../../types";
import More from "./More";

const Posts = ({
  posts,
  language,
  endCursor,
  Link,
  Image,
}: {
  posts: Post[];
  language: "EN" | "DE";
  endCursor: string;
  Link: NextLink;
  Image: NextImage;
}) => {
  return (
    <section className={styles.section}>
      <Container>
        {posts.map((item) => {
          const date = new Date(item.date).toLocaleDateString("de-DE");

          return (
            <div key={item.id} className={styles.item}>
              <div className={styles.wrapper}>
                <div className={styles.image}>
                  {item.CustomFieldsPosts.thumbnailImage && (
                    <Image
                      src={item.CustomFieldsPosts.thumbnailImage.sourceUrl}
                      alt={item.title || ""}
                      width={626}
                      height={375}
                    />
                  )}
                </div>
                <div className={styles.texts}>
                  {date && <span className={styles.date}>{date}</span>}
                  <h2 className={styles.title}>
                    <Link href={`/news/${item.uri}`}>{item.title}</Link>
                  </h2>
                  <div className={styles.excerpt}>
                    {item.CustomFieldsPosts.excerpt}
                  </div>
                  <div className={styles.buttonWrapper}>
                    <Link className={styles.button} href={`/news/${item.uri}`}>
                      {translate("Read more")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <More
          language={language}
          endCursor={endCursor}
          Link={Link}
          Image={Image}
        />
      </Container>
    </section>
  );
};

export default Posts;
