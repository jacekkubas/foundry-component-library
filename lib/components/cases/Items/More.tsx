"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Hourglass from "../../../assets/svg/hourglass.svg";
import { translate } from "../../../utils";
import { getCases } from "../../../queries";
import { Case, NextImage, NextLink } from "../../../types";
import Video from "./Video";
import Arrow from "../../../assets/svg/caret-right.svg";

const More = ({
  language,
  endCursor,
  currentCategory,
  Image,
  Link,
}: {
  language: "EN" | "DE";
  endCursor: string;
  currentCategory: string;
  Image: NextImage;
  Link: NextLink;
}) => {
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);
  const [end, setEnd] = useState<string | null>(endCursor);
  const [finished, setFinished] = useState(false);

  const handleMore = async () => {
    setLoading(true);

    const { cases: newCases, pageInfo } = await getCases({
      language: language,
      category: currentCategory,
      params: {
        after: end,
      },
    });

    if (!pageInfo.hasNextPage) {
      setFinished(true);
    }

    setCases([...cases, ...newCases]);
    setEnd(pageInfo.endCursor);
    setLoading(false);
  };

  useEffect(() => {
    setCases([]);
  }, [currentCategory]);

  if (!cases) return null;

  return (
    <>
      {cases.map((item) => {
        if (!item.case) return null;
        const { thumbnailVideo, mainImage } = item.case;

        return (
          <div key={item.id} className={styles.case}>
            <Link href={item.uri}>
              {thumbnailVideo && (
                <Video url={thumbnailVideo.mediaItemUrl} Image={Image} />
              )}
              {!thumbnailVideo && mainImage && mainImage.sourceUrl && (
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.image}
                    src={mainImage.sourceUrl}
                    alt={item.title || ""}
                    width={720}
                    height={490}
                  />
                </div>
              )}
              <div className={styles.texts}>
                <h3 className={styles.title}>{item.title}</h3>
                <div className={styles.arrowWrapper}>
                  <Arrow />
                </div>
              </div>
            </Link>
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
