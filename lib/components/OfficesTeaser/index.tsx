import React from "react";
import Offices from "../contact/Offices";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextImage, NextLink, OfficeDetails } from "../../types";

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
          <div className={styles.caption}>Our Offices</div>
          <div
            className={styles.heading}
          >{`We operate all\nover the world`}</div>
        </div>

        <div className={styles.offices}>
          <Offices details={details} Image={Image} />
        </div>
      </div>
    </Container>
  );
};

export default OfficesTeaser;
