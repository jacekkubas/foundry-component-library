import TextSection from "../TextSection";
import styles from "./styles.module.scss";
import Container from "../Container";
import LogoRanked from "../../assets/svg/partners/Get-ranked.svg";
import LogoIaa from "../../assets/svg/partners/IAA_logo.svg";
import LogoPmg from "../../assets/svg/partners/PMG_logo.svg";
import LogoNetwork from "../../assets/svg/partners/network_logo.svg";
import LogoPingpong from "../../assets/svg/partners/pingpongdigital.svg";
import LogoRefluenced from "../../assets/svg/partners/refluenced_logo.svg";

const PartnerNetwork = ({
  caption,
  heading,
  text,
  // partners,
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
  // if (!partners) return;

  return (
    <div className={styles.partnersNetwork}>
      <TextSection caption={caption} heading={heading} text={text} isSmall />
      <Container>
        <div className={styles.partners}>
          <LogoPmg />
          <LogoNetwork />
          <LogoIaa />
          <LogoRanked />
          <LogoPingpong />
          <LogoRefluenced />
        </div>
        {/* {partners.length && (
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
        )} */}
      </Container>
    </div>
  );
};

export default PartnerNetwork;
