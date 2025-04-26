import TextSection from "../TextSection";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage } from "../../types";

const PartnerNetwork = ({
  caption,
  heading,
  text,
  partners,
  Image,
}: {
  caption?: string;
  heading?: string;
  text?: string;
  partners?: {
    image?: {
      sourceUrl: string;
    };
  }[];
  Image: NextImage;
}) => {
  if (!partners) return;

  return (
    <div className={styles.partnersNetwork}>
      <TextSection caption={caption} heading={heading} text={text} isSmall />
      <Container>
        {partners.length && (
          <div className={styles.partners}>
            {partners.map((partner) => {
              return (
                <div key={partner.image?.sourceUrl} className={styles.partner}>
                  <div className={styles.image}>
                    <Image src={partner.image?.sourceUrl || ""} alt="" fill />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default PartnerNetwork;
