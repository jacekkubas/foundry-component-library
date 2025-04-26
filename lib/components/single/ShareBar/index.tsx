"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Comment from "../../../assets/svg/comment.svg?react";
import Facebook from "../../../assets/svg/facebook.svg?react";
import LinkedIn from "../../../assets/svg/linkedin.svg?react";
import Container from "../../Container";
import { translate } from "../../../utils";
import { NextLink } from "../../../types";

function ShareBar({ Link }: { Link: NextLink }) {
  const [url, setUrl] = useState("https://foundry.berlin");

  useEffect(() => {
    if (document && document.URL) {
      setUrl(document.URL);
    }
  }, []);

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.contact}>
          <Comment />
          <Link href="/contact">{translate("Contact Us")}</Link>
        </div>
        <div className={styles.social}>
          <span className={styles.socialLabel}>{translate("Share")}</span>
          <a
            className={styles.socialItem}
            href={`http://www.facebook.com/share.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
            facebook
          </a>
          <a
            className={styles.socialItem}
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
            linked in
          </a>
        </div>
      </div>
    </Container>
  );
}

export default ShareBar;
