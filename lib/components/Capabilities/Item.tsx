"use client";
import React from "react";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { Case, NextImage } from "../../types";
import styles from "./styles.module.scss";
import Arrow from "../../assets/svg/arrow.svg";
import LinkType from "next/link";

const Item = ({
  title,
  text,
  cases,
  active,
  setActive,
  Link,
  Image,
}: {
  title: string;
  text: string;
  cases: Case[];
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  Link?: typeof LinkType | React.ElementType;
  Image: NextImage;
}) => {
  const casesRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [preventClick, setPreventClick] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!casesRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - casesRef.current.offsetLeft);
    setScrollLeft(casesRef.current.scrollLeft);
    setPreventClick(false);
    casesRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !casesRef.current) return;
    const x = e.pageX - casesRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    casesRef.current.scrollLeft = scrollLeft - walk;

    if (Math.abs(walk) > 5) {
      setPreventClick(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (casesRef.current) casesRef.current.style.cursor = "grab";
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (preventClick) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const isActive = active === title;

  return (
    <div className={`${styles.item} ${isActive ? styles.active : ""}`}>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <button
          className={styles.icon}
          onClick={() => {
            if (isActive) {
              setActive("");
            } else {
              setActive(title);
            }
          }}
        >
          {isActive && <span>-</span>}
          {!isActive && <span>+</span>}
        </button>
      </div>
      <div className={styles.rows}>
        <div className={styles.row}>
          <div className={styles.rowWrapper}>
            <div className={styles.text}>{text}</div>
            <div className={styles.right}>
              <div
                className={styles.cases}
                ref={casesRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                  overflow: "hidden",
                  cursor: "grab",
                  userSelect: "none",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {Link &&
                  cases.map((item) => {
                    return (
                      <Link
                        href={item.uri}
                        key={item.uri}
                        className={styles.case}
                        draggable={false}
                        onClick={handleClick}
                      >
                        <div className={styles.caseImage}>
                          {Image && (
                            <Image
                              src={item.case?.mainImage?.sourceUrl || ""}
                              alt={item.title}
                              fill
                            />
                          )}
                        </div>
                        <div className={styles.caseTitle}>
                          {item.title} <Arrow />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
