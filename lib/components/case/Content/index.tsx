import FullWidthImage from "./FullWidthImage";
import CenterColumn from "./CenterColumn";
import TwoColumns from "./TwoColumns";
import ThreeColumns from "./ThreeColumns";
import Video from "./Video";
import Container from "../../Container";
import styles from "./styles.module.scss";
import { type Content, NextImage } from "../../../types";
import Results from "./Results";
import Numbers from "./Numbers";
import QuoteSection from "../../QuoteSection";

function CaseContent({
  content,
  Image,
}: {
  content: Content;
  Image: NextImage;
}) {
  if (!content) return null;

  return (
    <div className={styles.content}>
      {content.map((section, i) => {
        if (section.fieldGroupName === "Case_Case_Content_Quote") {
          return (
            <QuoteSection
              key={section.fieldGroupName + i}
              items={[
                {
                  name: section.name,
                  position: section.position,
                  text: section.text,
                },
              ]}
            />
          );
        }
        if (section.fieldGroupName === "Case_Case_Content_Results") {
          return <Results key={section.fieldGroupName + i} section={section} />;
        }
        if (section.fieldGroupName === "Case_Case_Content_Numbers") {
          return <Numbers key={section.fieldGroupName + i} section={section} />;
        }
        if (section.fieldGroupName === "Case_Case_Content_FullWidthImage") {
          return (
            <FullWidthImage
              key={section.fieldGroupName + i}
              section={section}
              Image={Image}
            />
          );
        }
        if (section.fieldGroupName === "Case_Case_Content_CenterColumn") {
          return (
            <CenterColumn key={section.fieldGroupName + i} section={section} />
          );
        }
        if (section.fieldGroupName === "Case_Case_Content_Twocolumns") {
          return (
            <TwoColumns
              key={section.fieldGroupName + i}
              section={section}
              Image={Image}
            />
          );
        }
        if (section.fieldGroupName === "Case_Case_Content_Threecolumns") {
          return (
            <ThreeColumns
              key={section.fieldGroupName + i}
              section={section}
              Image={Image}
            />
          );
        }
        if (section.fieldGroupName === "Case_Case_Content_Video") {
          return (
            <section
              className={styles.section}
              key={section.fieldGroupName + i}
            >
              <Container>
                <Video section={section} />
              </Container>
            </section>
          );
        }

        return undefined;
      })}
    </div>
  );
}

export default CaseContent;
