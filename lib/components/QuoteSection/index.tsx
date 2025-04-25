"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Container from "../Container";

const QuoteSection = ({
  items,
}: {
  items: {
    name?: string;
    position?: string;
    text?: string;
  }[];
}) => {
  const [active, setActive] = useState(0);
  if (!items || (items.length === 1 && !items[0].text)) return;

  return (
    <div className={styles.quote}>
      <Container>
        {items.map((item, i) => {
          return (
            <div
              key={item?.name || i}
              className={`${styles.content} ${
                active === i ? styles.active : ""
              }`}
            >
              <div className={styles.person}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.position}>{item.position}</div>
              </div>
              <div className={styles.text}>{item.text}</div>
            </div>
          );
        })}
        {items.length > 1 && (
          <div className={styles.indicators}>
            {items.map((el, i) => {
              return (
                <div
                  key={el.name}
                  className={`${styles.indicator} ${
                    active === i ? styles.active : ""
                  }`}
                  onClick={() => {
                    setActive(i);
                  }}
                />
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default QuoteSection;
