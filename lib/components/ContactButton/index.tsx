import styles from "./styles.module.scss";
import Unicorn from "../../assets/svg/unicorn.svg";
import { NextLink } from "../../types";

const ContactButton = ({ Link }: { Link: NextLink }) => {
  return (
    <Link className={styles.contactButton} href="/contact" scroll={false}>
      <Unicorn />
      {`Get in\ntouch!`}
    </Link>
  );
};

export default ContactButton;
