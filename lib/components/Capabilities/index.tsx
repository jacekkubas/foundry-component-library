"use client";
import { useState } from "react";
import Container from "../Container";
import styles from "./styles.module.scss";
import type { Case, NextImage } from "../../types";
import Item from "./Item";
import LinkType from "next/link";
import { translate } from "../../utils";

const Capabilities = ({
  heading,
  items,
  Link,
  Image,
}: {
  heading: string;
  items: {
    heading: string;
    text: string;
    cases: Case[];
  }[];
  Link?: typeof LinkType;
  Image: NextImage;
}) => {
  const [active, setActive] = useState("");

  if (!items) return;

  return (
    <Container>
      <a className={styles.button} href="#get-in-touch">
        {translate("Get in touch", "DE")}
      </a>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.items}>
        {items.map((item) => {
          return (
            <Item
              key={item.heading}
              title={item.heading}
              text={item.text}
              cases={item.cases || []}
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
