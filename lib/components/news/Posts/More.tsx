"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Hourglass from "../../../assets/svg/hourglass.svg?react";
import { translate } from "../../../utils";
import { getPosts } from "../../../queries";
import { NextImage, NextLink, Post } from "../../../types";

const More = ({
  endCursor,
  Link,
  Image,
}: {
  endCursor: string;
  Link: NextLink;
  Image: NextImage;
}) => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<Post[]>([]);
  const [end, setEnd] = useState<string | null>(endCursor);
  const [finished, setFinished] = useState(false);

  const handleMore = async () => {
    setLoading(true);

    const { posts, pageInfo } = await getPosts({ params: { after: end } });

    if (!pageInfo.hasNextPage) {
      setFinished(true);
    }

    setNews([...news, ...posts]);
    setEnd(pageInfo.endCursor);
    setLoading(false);
  };

  return (
    <>
      {news &&
        news.map((item) => {
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
                  <div className={styles.btn}>
                    <Link href={`/news/${item.uri}`}>
                      {translate("Read more")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <div className={styles.bottom}>
        {loading && (
          <div className={styles.loading}>
            <Hourglass />
          </div>
        )}
        {!loading && !finished && (
          <button
            type="button"
            className={styles.loadMore}
            onClick={handleMore}
          >
            {translate("Load more")}
          </button>
        )}
      </div>
    </>
  );
};

export default More;
