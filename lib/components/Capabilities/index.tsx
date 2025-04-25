"use client";
import { useState } from "react";
import Container from "../Container";
import styles from "./styles.module.scss";
import type { Case, NextImage } from "../../types";
import Item from "./Item";
import LinkType from "next/link";

const Capabilities = ({
  items,
  Link,
  Image,
}: {
  items: {
    heading: string;
    text: string;
    cases: Case[];
  }[];
  Link?: typeof LinkType | React.ElementType;
  Image: NextImage;
}) => {
  const [active, setActive] = useState("");

  if (!items) return;

  return (
    <Container>
      <div className={styles.heading}>Our capabilities</div>
      <div className={styles.items}>
        {items.map((item) => {
          return (
            <Item
              key={item.heading}
              title={item.heading}
              text={item.text}
              cases={item.cases}
              active={active}
              setActive={setActive}
              Link={Link}
              Image={Image}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Capabilities;
