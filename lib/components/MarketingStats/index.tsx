import React from "react";
import TextSection from "../TextSection";
import styles from "./styles.module.scss";
import Container from "../Container";
import Arrow from "../../assets/svg/arrow.svg?react";
import { NextImage } from "../../types";

const MarketingStats = ({
  heading,
  items,
  Image,
}: {
  heading: string;
  items: {
    image?: {
      sourceUrl: string;
    };
    title: string;
    text: string;
    details?: {
      percent?: string;
      detail?: string;
    }[];
  }[];
  Image: NextImage;
}) => {
  return (
    <div className={styles.marketingStats}>
      <TextSection caption="CASE STUDIES" heading={heading} />
      <Container>
        <div className={styles.wrapper}>
          {items.map((item) => {
            return (
              <div key={item.title} className={styles.item}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image?.sourceUrl || ""}
                    alt={item.title}
                    fill
                  />
                </div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.text}>{item.text}</div>
                <div className={styles.details}>
                  {item.details?.map((detail) => (
                    <div key={detail.detail} className={styles.row}>
                      <div className={styles.percent}>
                        <Arrow />
                        {detail.percent}
                      </div>
                      <div className={styles.detail}>{detail.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default MarketingStats;
