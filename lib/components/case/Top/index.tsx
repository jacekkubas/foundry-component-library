import styles from "./styles.module.scss";
import Container from "../../Container";
import { translate } from "../../../utils";
import { Case, NextImage } from "../../../types";
import ShareButton from "../../case/ShareButton";

function Top({
  data,
  title,
  isCase,
  Image,
}: {
  data?: Case;
  title: string;
  subtitle?: string;
  isCase?: boolean;
  Image: NextImage;
}) {
  if (!data) return;
  const { caption, details, awards } = data.case;

  return (
    <div className={styles.top}>
      {data.case.mainImage && (
        <div className={styles.mainImage}>
          <Image src={data.case.mainImage.sourceUrl} alt={title} fill />
        </div>
      )}
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            <div>
              {caption && <div className={styles.caption}>{caption}</div>}
              <h1 className={`${styles.title} ${isCase ? styles.isCase : ""}`}>
                {title}
              </h1>
            </div>
            <ShareButton />
          </div>

          <div className={styles.details}>
            {details &&
              details.map((detail, i) => {
                const { heading, text } = detail;

                return (
                  <div key={heading + i} className={styles.detail}>
                    {heading && <div className={styles.heading}>{heading}</div>}
                    {text && <div className={styles.paragraph}>{text}</div>}
                  </div>
                );
              })}
            {awards && (
              <div className={styles.awardsWrapper}>
                <div className={styles.heading}>{translate("Awards")}</div>
                <div className={styles.awards}>
                  {awards.map((award, i) => {
                    const { heading, text, image } = award;

                    return (
                      <div key={i} className={styles.award}>
                        {(heading || text) && (
                          <div className={styles.awardTexts}>
                            {heading && (
                              <h3
                                className={styles.awardHeading}
                                dangerouslySetInnerHTML={{ __html: heading }}
                              />
                            )}
                            {text && (
                              <h4
                                className={styles.awardText}
                                dangerouslySetInnerHTML={{ __html: text }}
                              />
                            )}
                          </div>
                        )}
                        <div className={styles.awardImage}>
                          <img src={image.sourceUrl} alt={heading} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Top;
