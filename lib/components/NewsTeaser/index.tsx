"use client";
import { useRef } from "react";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage, NextLink, PostPreview } from "../../types";
import Arrow from "../../assets/svg/arrow.svg";
import useDrag from "../../hooks/useDrag";

const NewsTeaser = ({
  caption,
  heading,
  text,
  posts,
  Link,
  Image,
}: {
  caption: string;
  heading: string;
  text: string;
  posts: PostPreview[];
  Link: NextLink;
  Image: NextImage;
}) => {
  const sectionRef = useRef(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, dragStyle } =
    useDrag(sectionRef);

  if (!posts) return;

  return (
    <div className={styles.newsTeaser}>
      <Container noMobilePadding>
        <div className={styles.wrapper}>
          <div className={styles.texts}>
            <div className={styles.caption}>{caption}</div>
            <div className={styles.heading}>{heading}</div>
            <div className={styles.text}>{text}</div>
            <Link className={`${styles.button} ${styles.desktop}`} href="/news">
              Explore
            </Link>
          </div>
          <div
            ref={sectionRef}
            className={styles.items}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={dragStyle as React.CSSProperties}
          >
            {posts.map((post) => {
              const { id, title, uri, CustomFieldsPosts: customFields } = post;

              return (
                <div key={id} className={styles.item}>
                  <div className={styles.image}>
                    <Image
                      src={customFields.thumbnailImage.sourceUrl}
                      width={260}
                      height={220}
                      alt={title}
                    />
                  </div>
                  <div className={styles.itemTexts}>
                    <div>
                      <div className={styles.title}>{title}</div>
                      <div className={styles.excerpt}>
                        {customFields.excerpt}
                      </div>
                    </div>
                    <Link className={styles.more} href={`news${uri}`}>
                      Read More
                      <Arrow />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <Link className={`${styles.button} ${styles.mobile}`} href="/news">
            Explore News
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NewsTeaser;
