"use client";
import { useRef } from "react";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage, NextLink, PostPreview } from "../../types";
import Arrow from "../../assets/svg/arrow.svg";
import { motion } from "framer-motion";
import WavyText from "../TextAnimations/WavyText";
import FadeInText from "../TextAnimations/FadeInText";
import PopInText from "../TextAnimations/PopInText";

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
  const wrapperRef = useRef(null);
  const dragStarted = useRef(false);

  if (!posts) return;

  return (
    <div className={styles.newsTeaser}>
      <Container noMobilePadding>
        <div className={styles.wrapper}>
          <div className={styles.texts}>
            <PopInText className={styles.caption} text={caption} />
            <WavyText className={styles.heading} text={heading} />
            <FadeInText className={styles.text} text={text} />
            {/* <div className={styles.text}>{text}</div> */}
            <Link className={`${styles.button} ${styles.desktop}`} href="/news">
              Explore
            </Link>
          </div>
          <div ref={wrapperRef} className={styles.newsWrapper}>
            <motion.div
              className={styles.items}
              drag="x"
              dragConstraints={wrapperRef}
              onDragStart={() => (dragStarted.current = true)}
              onDragEnd={() => {
                setTimeout(() => {
                  dragStarted.current = false;
                }, 0);
              }}
            >
              {posts.map((post) => {
                const {
                  id,
                  title,
                  uri,
                  CustomFieldsPosts: customFields,
                } = post;

                return (
                  <motion.div
                    key={id}
                    className={styles.item}
                    whileHover={{
                      y: -10,
                    }}
                  >
                    <div className={styles.image}>
                      {customFields.thumbnailImage && (
                        <Image
                          src={customFields.thumbnailImage?.sourceUrl}
                          width={260}
                          height={220}
                          alt={title}
                        />
                      )}
                    </div>
                    <div className={styles.itemTexts}>
                      <div>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.excerpt}>
                          {customFields.excerpt}
                        </div>
                      </div>
                      <Link
                        className={styles.more}
                        href={`news${uri}`}
                        onClick={(e) => {
                          if (dragStarted.current) {
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        }}
                      >
                        Read More
                        <Arrow />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
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
