"use client";
import { useState } from "react";
import Container from "../../Container";
import Video from "./Video";
import styles from "./styles.module.scss";
import Arrow from "../../../assets/svg/arrow.svg?react";
import { Case, NextImage, NextLink, NextRouter } from "../../../types";
import Top from "../Top";

function Cases({
  cases,
  currentService,
  currentIndustry,
  Link,
  Image,
  useRouter,
}: {
  cases: Case[];
  currentService?: string;
  currentIndustry?: string;
  Link: NextLink;
  Image: NextImage;
  useRouter: () => NextRouter;
}) {
  let defaultValue = {
    category: "featured",
    tag: "featured",
  };

  if (currentService) {
    defaultValue = {
      category: "service",
      tag: currentService,
    };
  }

  if (currentIndustry) {
    defaultValue = {
      category: "industry",
      tag: currentIndustry,
    };
  }

  const [selected, setSelected] = useState(defaultValue);
  const services = [
    "Brand Identity",
    "Advertising & Campaigning",
    "Strategy & Growth",
    "Social Media & Influencer Marketing",
    "Media & Performance",
    "Content Creation & Production",
    "B2B & Thought-Leadership",
  ];
  const industries = [
    "Banken & Versicherungen",
    "FMCG",
    "Gesundheit & Wellness",
    "Handel & E-Commerce",
    "Lifestyle",
    "Mobilität & Transport",
    "Forschung & Bildung",
    "Hospitality & Real Estate",
    "Öffentlicher Sektor & Non-Profit",
    "Versorgungsunternehmen",
    "Konsumgüter & Technologie",
    "Dienstleister",
  ];

  return (
    <>
      <Top
        services={Array.from(services)}
        industries={Array.from(industries)}
        selected={selected}
        setSelected={setSelected}
        useRouter={useRouter}
      />
      <Container>
        <div className={styles.wrapper}>
          {cases.map((item) => {
            if (!item.case) return null;
            const { thumbnailVideo, mainImage } = item.case;

            return (
              <div key={item.id} className={styles.case}>
                <Link href={item.uri}>
                  {thumbnailVideo && (
                    <Video url={thumbnailVideo.mediaItemUrl} />
                  )}
                  {!thumbnailVideo && mainImage && (
                    <div className={styles.imageWrapper}>
                      {mainImage.sourceUrl && (
                        <Image
                          className={styles.image}
                          src={mainImage.sourceUrl}
                          alt={item.title || ""}
                          width={720}
                          height={490}
                        />
                      )}
                    </div>
                  )}
                  <div className={styles.texts}>
                    <div>
                      <h3 className={styles.title}>{item.title}</h3>
                      <div className={styles.caption}>{item.case.caption}</div>
                    </div>
                    <div className={styles.arrowWrapper}>
                      <Arrow />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        {cases.length < 1 && <div>no cases in this category</div>}
      </Container>
    </>
  );
}

export default Cases;
