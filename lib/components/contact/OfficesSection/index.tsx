import Container from "../../Container";
import Offices from "../Offices";
import styles from "./styles.module.scss";
import { NextImage, OfficeDetails } from "../../../types";

const index = ({
  details,
  Image,
}: {
  details: OfficeDetails;
  Image: NextImage;
}) => {
  return (
    <div className={styles.officesSection}>
      <Container noMobilePadding>
        <Offices details={details} Image={Image} />
      </Container>
    </div>
  );
};

export default index;
