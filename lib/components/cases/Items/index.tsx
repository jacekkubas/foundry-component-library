"use client";
import { useState } from "react";
import Container from "../../Container";
import Video from "./Video";
import styles from "./styles.module.scss";
import Arrow from "../../../assets/svg/arrow.svg";
import { Case, NextImage, NextLink, NextRouter } from "../../../types";
import Top from "../Top";
import { SERVICES, INDUSTRIES_GERMAN, INDUSTRIES_DISPLAY_LABELS } from "../../constants";
import { usePathname } from "next/navigation";

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

  const path = usePathname();
  const currentLang = path.startsWith("/de") ? "DE" : "EN";

  const langPrefix =
    currentLang === "EN" ? "" : `/${currentLang.toLowerCase()}`;

  // Use centralized lists from constants for services and industries
  const services = SERVICES;
  const industries = INDUSTRIES_GERMAN;

  return (
    <>
      <Top
        services={services as string[]}
        industries={industries as string[]}
        industriesDisplayLabels={INDUSTRIES_DISPLAY_LABELS}
        selected={selected}
        setSelected={setSelected}
        useRouter={useRouter}
      />
      <Container>
        <div className={styles.wrapper}>
          {cases.map((item) => {
            if (!item.case) return null;
            const { thumbnailVideo, mainImage, thumbnailImage } = item.case;

            return (
              <div key={item.id} className={styles.case}>
                <Link
                  href={`${langPrefix}/cases/${
                    item.status !== "draft" ? item.slug : `preview/${item.id}`
                  }`}>
                  {thumbnailVideo && (
                    <Video
                      url={thumbnailVideo.mediaItemUrl}
                      alt={item.title}
                      Image={Image}
                    />
                  )}
                  {!thumbnailVideo && (thumbnailImage || mainImage) && (
                    <div className={styles.imageWrapper}>
                      <Image
                        className={styles.image}
                        src={
                          thumbnailImage?.sourceUrl ||
                          mainImage?.sourceUrl ||
                          ""
                        }
                        alt={item.title || ""}
                        width={720}
                        height={490}
                      />
                    </div>
                  )}
                  <div className={styles.texts}>
                    <div>
                      <h3 className={styles.title}>{item.title}</h3>
                      {item.status === "draft" && <div>DRAFT</div>}
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
