"use client";
import Container from "../../Container";
import styles from "./styles.module.scss";
import Arrow from "../../../assets/svg/arrow.svg";
import { useState } from "react";
import Script from "next/script";
import useClickOutside from "../../../hooks/useClickOutside";

function Contacts({
  title,
  items,
}: {
  title: string;
  items: {
    heading: string;
    subheading: string;
    email: string;
  }[];
}) {
  const [isTypeformOpen, setIsTypeformOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsTypeformOpen(false));
  if (!items) return;

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.boxes}>
          {items.map((item, i) => {
            const {
              heading,
              subheading,
              // email
            } = item;

            return (
              <div className={styles.box} key={heading}>
                <div>
                  <h3 className={styles.heading}>{heading}</h3>
                  <div
                    className={styles.subheading}
                    dangerouslySetInnerHTML={{ __html: subheading }}
                  />
                </div>
                <a
                  className={styles.buttonSecondary}
                  onClick={() => setIsTypeformOpen(true)}
                >
                  {i === 0 && "Contact Account"}
                  {i === 1 && "General Contact"}
                  {i === 2 && "Contact HR"}
                  <Arrow />
                </a>
              </div>
            );
          })}
        </div>
        <div
          className={styles.typeform}
          style={{ display: isTypeformOpen ? "flex" : "none" }}
        >
          <Script src="//embed.typeform.com/next/embed.js" />
          <div ref={ref} className={styles.typeformWrapper}>
            {/* <div data-tf-widget="qmv6Yk" data-tf-iframe-props="title=Foundry Website Contact Form" data-tf-medium="snippet" style={{ width: '100%', height: '400px' }} /> */}
            <div
              data-tf-widget="DJkseH"
              data-tf-iframe-props="title=Foundry Website Contact Form"
              data-tf-medium="snippet"
              style={{ width: "100%", height: "400px" }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Contacts;
