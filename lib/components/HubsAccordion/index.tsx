"use client";
import { useState } from "react";
import Container from "../Container";
import styles from "./styles.module.scss";
import Hub from "./Hub";
import { NextImage, NextLink } from "../../types";

const HubsAccordion = ({
  hubs,
  Link,
  Image,
}: {
  hubs: Hub[];
  Link: NextLink;
  Image: NextImage;
}) => {
  const [active, setActive] = useState("");

  return (
    <div className={styles.hubsAccordion}>
      <Container noMobilePadding>
        <div className={styles.hubs}>
          {hubs.map((hub) => {
            return (
              <Hub
                key={hub.id}
                hub={hub}
                active={active}
                setActive={setActive}
                Link={Link}
                Image={Image}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default HubsAccordion;
