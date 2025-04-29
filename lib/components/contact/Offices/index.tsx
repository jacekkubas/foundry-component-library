"use client";
import { useRef } from "react";
import styles from "./styles.module.scss";
import { NextImage, OfficeDetails } from "../../../types";
import useDrag from "../../../hooks/useDrag";

function Offices({
  details,
  Image,
}: {
  details: OfficeDetails;
  Image: NextImage;
}) {
  const {
    berlinImage,
    berlinText,
    berlinEmail,
    berlinPhone,
    berlinAddress,
    berlinAddressLink,
    zurichImage,
    zurichText,
    zurichEmail,
    zurichPhone,
    zurichAddress,
    zurichAddressLink,
    newyorkImage,
    newyorkText,
    newyorkEmail,
    newyorkPhone,
    newyorkAddress,
    newyorkAddressLink,
  } = details;
  const sectionRef = useRef(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, dragStyle } =
    useDrag(sectionRef);

  return (
    <section>
      <div
        ref={sectionRef}
        className={styles.wrapper}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={dragStyle as React.CSSProperties}
      >
        <div className={styles.office}>
          <div className={styles.image}>
            {berlinImage && (
              <Image src={berlinImage.sourceUrl} alt={berlinText || ""} fill />
            )}
          </div>
          <div className={styles.heading}>Berlin</div>
          <div className={styles.text}>
            <a href={`mailto:${berlinEmail}`}>{berlinEmail}</a>
          </div>
          <div className={`${styles.phone} ${styles.hasMargin}`}>
            <a href={`tel:${berlinPhone?.replace(/ /g, "")}`}>{berlinPhone}</a>
          </div>
          <a
            href={berlinAddressLink}
            target="_blank"
            className={styles.address}
            dangerouslySetInnerHTML={{ __html: berlinAddress || "" }}
          />
        </div>
        <div className={styles.office}>
          <div className={styles.image}>
            {zurichImage && (
              <Image src={zurichImage.sourceUrl} alt={zurichText || ""} fill />
            )}
          </div>
          <div className={styles.heading}>Zurich</div>
          <div className={styles.text}>
            <a href={`mailto:${zurichEmail}`}>{zurichEmail}</a>
          </div>
          <div className={`${styles.phone} ${styles.hasMargin}`}>
            <a href={`tel:${zurichPhone?.replace(/ /g, "")}`}>{zurichPhone}</a>
          </div>
          <a
            href={zurichAddressLink}
            target="_blank"
            className={styles.address}
            dangerouslySetInnerHTML={{ __html: zurichAddress || "" }}
          />
        </div>
        <div className={styles.office}>
          <div className={styles.image}>
            {newyorkImage && (
              <Image
                src={newyorkImage.sourceUrl}
                alt={newyorkText || ""}
                fill
              />
            )}
          </div>
          <div className={styles.heading}>New York</div>
          <div className={styles.text}>
            <a href={`mailto:${newyorkEmail}`}>{newyorkEmail}</a>
          </div>
          <div className={`${styles.phone} ${styles.hasMargin}`}>
            <a href={`tel:${newyorkPhone?.replace(/ /g, "")}`}>
              {newyorkPhone}
            </a>
          </div>
          <a
            href={newyorkAddressLink}
            target="_blank"
            className={styles.address}
            dangerouslySetInnerHTML={{ __html: newyorkAddress || "" }}
          />
        </div>
      </div>
    </section>
  );
}

export default Offices;
