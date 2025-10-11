"use client";
import {
  useRef,
  useState,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NextImage, NextLink, type Hub } from "../../types";
import styles from "./styles.module.scss";
import Arrow from "../../assets/svg/arrow.svg";
import useDrag from "../../hooks/useDrag";
import Plus from "./plus.svg";
import Minus from "./minus.svg";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(0);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    preventedClick,
    dragStyle,
  } = useDrag(casesRef);

  const isActive = active === hub.slug;
  const customFields = hub.customFieldsHub;

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isActive, customFields]);

  return (
    <div className={`${styles.hub} ${isActive ? styles.active : ""}`}>
      <div className={styles.top}>
        <div className={styles.title}>{hub.title}</div>
        <div className={styles.text}>{customFields.subheading}</div>
        <button
          className={styles.icon}
          onClick={() => setActive(isActive ? "" : hub.slug)}>
          {isActive ? <Minus /> : <Plus />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {(isActive || height !== 0) && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isActive ? height : 0,
              opacity: isActive ? 1 : 0,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}>
            <div ref={contentRef}>
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
                          }}>
                          {customFields.relatedWork.map((item) => {
                            const { thumbnailImage, mainImage } = item.case;

                            return (
                              <Link
                                href={item.uri}
                                key={item.id}
                                className={styles.case}
                                draggable={false}
                                onClick={preventedClick}>
                                <div className={styles.caseImage}>
                                  <Image
                                    src={
                                      thumbnailImage?.sourceUrl ||
                                      mainImage?.sourceUrl ||
                                      ""
                                    }
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hub;
