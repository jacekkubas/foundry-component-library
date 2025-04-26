"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import Word from "./Word";
import Container from "../Container";
import styles from "./styles.module.scss";
import { NextLink } from "../../types";

const LargeText = ({
  text,
  theme = "brown",
  withButton,
  Link,
}: {
  text: string;
  theme?: "brown" | "white";
  withButton?: boolean;
  Link: NextLink;
}) => {
  const paragraph = useRef(null);
  const { scrollYProgress } = useScroll({
    target: paragraph,
    offset: ["start 0.6", "end 0.6"],
  });

  const words = text.split(" ");

  return (
    <div className={`${styles.largeText} ${styles[theme]}`}>
      <Container>
        <div className={styles.wrapper} ref={paragraph}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;

            return (
              <Word
                key={i}
                text={word}
                range={[start, end]}
                progress={scrollYProgress}
              />
            );
          })}
        </div>
        {withButton && (
          <Link className={styles.button} href="/about-us">
            About Us
          </Link>
        )}
      </Container>
    </div>
  );
};

export default LargeText;
