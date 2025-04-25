import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage } from "../../types";

const Awards = ({
  heading,
  awards,
  Image,
}: {
  heading?: string;
  awards?: {
    image?: {
      sourceUrl: string;
    };
    heading?: string;
    text?: string;
  }[];
  Image: NextImage;
}) => {
  if (!awards) return;

  return (
    <Container>
      <div className={styles.awards}>
        {heading && <div className={styles.heading}>{heading}</div>}
        <div className={styles.items}>
          {awards.map((award, i) => {
            const { image, heading, text } = award;

            if (!heading) return;

            return (
              <div key={heading + i} className={styles.award}>
                <div className={styles.image}>
                  {image && <Image src={image?.sourceUrl} alt="" fill />}
                </div>
                <div className={styles.text}>{heading}</div>
                {text && <div className={styles.client}>{text}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Awards;
