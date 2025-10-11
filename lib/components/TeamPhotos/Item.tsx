"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { NextImage, Person } from "../../types";

const Item = ({ person, Image }: { person: Person; Image: NextImage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { image, video, name, position } = person;

  return (
    <div
      className={styles.person}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.image}>
        {video && <div>{video.sourceUrl}</div>}
        {image && (
          <Image
            src={isHovered && video ? video.sourceUrl : image.sourceUrl}
            alt={name}
            fill
          />
        )}
      </div>
      <div className={styles.name}>{name.replace("<br />", "\n")}</div>
      <div className={styles.position}>{position.replace("<br />", "\n")}</div>
    </div>
  );
};

export default Item;
