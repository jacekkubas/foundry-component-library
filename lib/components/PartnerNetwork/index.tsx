import TextSection from "../TextSection";
import styles from "./styles.module.scss";
import Container from "../Container";

const PartnerNetwork = ({
  caption,
  heading,
  text,
  partners,
}: {
  caption?: string;
  heading?: string;
  text?: string;
  partners?: {
    image?: {
      sourceUrl: string;
    };
  }[];
}) => {
  if (!partners) return;

  return (
    <div className={styles.partnersNetwork}>
      <TextSection caption={caption} heading={heading} text={text} isSmall />
      <Container>
        {partners.length && (
          <div className={styles.partners}>
            {partners.map((partner, i) => {
              return (
                <div
                  key={partner.image?.sourceUrl || "partner" + i}
                  className={styles.partner}>
                  {partner.image?.sourceUrl && (
                    <img src={partner.image?.sourceUrl || ""} alt="" />
                  )}
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
