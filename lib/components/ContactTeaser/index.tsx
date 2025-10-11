"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Container from "../Container";
import { translate } from "../../utils";
import { NextLink } from "../../types";
import WavyText from "../TextAnimations/WavyText";
import FadeInText from "../TextAnimations/FadeInText";
import useClickOutside from "../../hooks/useClickOutside";
import Script from "next/script";

const ContactTeaser = ({
  heading,
  text,
  theme = "yellow",
  buttonText = "Contact Us",
  buttonHref = "/contact#contact-us",
  alternate,
  Link,
}: {
  heading: string;
  text?: string;
  theme?: "yellow" | "pink";
  buttonText?: string;
  buttonHref?: string;
  alternate?: boolean;
  Link: NextLink;
}) => {
  const [isTypeformOpen, setIsTypeformOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsTypeformOpen(false);
  });

  return (
    <>
      <div className={`${styles.contactTeaser} ${styles[theme]}`}>
        <Container>
          <div className={styles.wrapper}>
            {heading && (
              <WavyText
                className={`${styles.heading} ${!text ? styles.margin : ""}`}
                text={heading}
                alternate={alternate}
              />
            )}
            {text && <FadeInText className={styles.text} text={text} />}
            {buttonHref !== "typeform" && (
              <Link href={buttonHref} className={styles.button}>
                {translate(buttonText)}
              </Link>
            )}
            {buttonHref == "typeform" && (
              <button
                className={styles.button}
                onClick={() => {
                  setIsTypeformOpen(true);
                }}>
                {translate(buttonText)}
              </button>
            )}
          </div>
        </Container>
      </div>
      {buttonHref === "typeform" && (
        <div
          className={styles.typeform}
          style={{ display: isTypeformOpen ? "flex" : "none" }}>
          <Script src="//embed.typeform.com/next/embed.js" />
          <div ref={ref} className={styles.typeformWrapper}>
            <div
              data-tf-widget="qmv6Yk"
              data-tf-iframe-props="title=Foundry Website Contact Form"
              data-tf-medium="snippet"
              style={{ width: "100%", height: "400px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ContactTeaser;
