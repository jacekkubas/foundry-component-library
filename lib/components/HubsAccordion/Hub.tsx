"use client";
import { useRef, Dispatch, SetStateAction } from "react";
import { NextImage, NextLink, type Hub } from "../../types";
import styles from "./styles.module.scss";
import Arrow from "../../assets/svg/arrow.svg";
import useDrag from "../../hooks/useDrag";

const Hub = ({
  hub,
  active,
  setActive,
  Link,
  Image,
}: {
  hub: Hub;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  Link: NextLink;
  Image: NextImage;
}) => {
  const casesRef = useRef<HTMLDivElement>(null);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    preventedClick,
    dragStyle,
  } = useDrag(casesRef);

  const isActive = active === hub.slug;
  const customFields = hub.customFieldsHub;

  return (
    <div className={`${styles.hub} ${isActive ? styles.active : ""}`}>
      <div className={styles.top}>
        <div className={styles.title}>{hub.title}</div>
        <div className={styles.text}>{customFields.subheading}</div>
        <button
          className={styles.icon}
          onClick={() => {
            if (isActive) {
              setActive("");
            } else {
              setActive(hub.slug);
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
            <div className={styles.subheading}>SERVICE</div>
            <div className={styles.right}>
              {customFields.tags && (
                <div className={styles.tags}>
                  {customFields.tags.map((tag) => `${tag.tag} // `)}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowWrapper}>
            <div className={styles.subheading}>APPROACH</div>
            <div className={styles.right}>
              <div className={styles.paragraph}>{customFields.approach}</div>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowWrapper}>
            <div className={styles.subheading}>RELATED WORK</div>
            <div className={styles.right}>
              {customFields.relatedWork && (
                <div
                  className={styles.cases}
                  ref={casesRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{
                    ...(dragStyle as React.CSSProperties),
                  }}
                >
                  {customFields.relatedWork.map((item) => {
                    return (
                      <Link
                        href={item.uri}
                        key={item.id}
                        className={styles.case}
                        draggable={false}
                        onClick={preventedClick}
                      >
                        <div className={styles.caseImage}>
                          <Image
                            src={item.case?.mainImage?.sourceUrl || ""}
                            alt={item.title}
                            fill
                          />
                        </div>
                        <div className={styles.caseTitle}>
                          {item.title} <Arrow />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className={styles.more}>
            <Link href={hub.uri}>
              Learn More <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hub;
