"use client";
import { useState, useEffect } from "react";
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
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!items || items.length <= 1) return;

    const interval = setInterval(() => {
      if (!paused) {
        setActive((prev) => (prev + 1) % items.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [items, paused]);

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
              }`}>
              <div className={styles.person}>
                <div>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.position}>{item.position}</div>
                </div>
              </div>
              <div
                className={styles.text}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}>
                {item.text}
              </div>
            </div>
          );
        })}
        {items.length > 1 && (
          <div className={`${styles.indicators} ${styles.desktop}}`}>
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
