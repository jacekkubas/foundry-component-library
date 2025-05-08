import React from "react";
import Offices from "../contact/Offices";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage, NextLink, OfficeDetails } from "../../types";
import PopInText from "../TextAnimations/PopInText";
import WavyText from "../TextAnimations/WavyText";

const OfficesTeaser = ({
  details,
  Image,
}: {
  details: OfficeDetails;
  Link: NextLink;
  Image: NextImage;
}) => {
  return (
    <Container noMobilePadding>
      <div className={styles.officesTeaser}>
        <div className={styles.texts}>
          <PopInText className={styles.caption} text="Our Offices" />
          <WavyText
            className={styles.heading}
            text={`We operate all\nover the world`}
          />
        </div>

        <div className={styles.offices}>
          <Offices details={details} Image={Image} />
        </div>
      </div>
    </Container>
  );
};

export default OfficesTeaser;
