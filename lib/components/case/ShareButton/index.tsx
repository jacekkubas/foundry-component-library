"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { translate } from "../../../utils";

function ShareButton() {
  const [url, setUrl] = useState("https://foundry.berlin");

  useEffect(() => {
    if (document && document.URL) {
      setUrl(document.URL);
    }
  }, []);

  return (
    <a
      className={styles.button}
      href={`http://www.facebook.com/share.php?u=${url}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {translate("Share")}
    </a>
  );
}

export default ShareButton;
