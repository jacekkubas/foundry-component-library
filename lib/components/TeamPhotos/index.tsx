"use client";
import { useRef } from "react";
import { translate } from "../../utils";
import Container from "../Container";
import styles from "./styles.module.scss";
import Item from "./Item";
import { NextImage, Person } from "../../types";
import useDrag from "../../hooks/useDrag";

const TheamPhotos = ({
  people,
  Image,
}: {
  people: Person[];
  Image: NextImage;
}) => {
  const sectionRef = useRef(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, dragStyle } =
    useDrag(sectionRef);

  return (
    <Container noMobilePadding>
      <div className={styles.heading}>{translate("Our Lovely Team")}</div>
      <div
        ref={sectionRef}
        className={styles.people}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={dragStyle as React.CSSProperties}
      >
        {people.map((person) => {
          return <Item key={person.name} person={person} Image={Image} />;
        })}
      </div>
    </Container>
  );
};

export default TheamPhotos;
