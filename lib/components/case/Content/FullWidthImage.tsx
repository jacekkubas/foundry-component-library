import styles from "./styles.module.scss";
import Container from "../../Container";
import type { NextImage, FullWidthImage } from "../../../types";

function FullWidthImage({
  section,
  Image,
}: {
  section: FullWidthImage;
  Image: NextImage;
}) {
  if (!section || !section.image) return null;

  const {
    image: { sourceUrl },
    caption,
  } = section;

  return (
    <section className={styles.section}>
      {!section.fullWidth && (
        <Container>
          <div className={styles.fullWidthImage}>
            {sourceUrl && (
              <Image
                className={styles.image}
                src={sourceUrl}
                alt={caption ? caption : "foundry digital agency"}
                layout="intrinsic"
                width={1252}
                height={600}
              />
            )}
          </div>
        </Container>
      )}
      {section.fullWidth && (
        <div className={styles.fullWidthImage}>
          {sourceUrl && (
            <Image
              className={styles.image}
              src={sourceUrl}
              alt={caption ? caption : "foundry digital agency"}
              layout="intrinsic"
              width={1400}
              height={600}
            />
          )}
        </div>
      )}
      {caption && (
        <Container>
          <div className={styles.caption}>{caption}</div>
        </Container>
      )}
    </section>
  );
}

export default FullWidthImage;
