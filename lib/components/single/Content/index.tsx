import FullWidthImage from "./FullWidthImage";
import CenterColumn from "./CenterColumn";
import TwoColumns from "./TwoColumns";
import Video from "./Video";
import Container from "../../Container";
import styles from "./styles.module.scss";
import { NextImage, Content } from "../../../types";

function PostContent({
  content,
  Image,
}: {
  content: Content;
  Image: NextImage;
}) {
  if (!content) return null;

  return (
    <div className={styles.wrapper}>
      {content.map((section, i) => {
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

        if (
          section.fieldGroupName ===
          "Post_Customfieldsposts_Content_FullWidthImage"
        ) {
          return (
            <FullWidthImage
              key={section.fieldGroupName + i}
              section={section}
              Image={Image}
            />
          );
        }
        if (
          section.fieldGroupName ===
          "Post_Customfieldsposts_Content_CenterColumn"
        ) {
          return (
            <CenterColumn key={section.fieldGroupName + i} section={section} />
          );
        }
        if (
          section.fieldGroupName === "Post_Customfieldsposts_Content_Twocolumns"
        ) {
          return (
            <TwoColumns
              key={section.fieldGroupName + i}
              section={section}
              Image={Image}
            />
          );
        }
        if (section.fieldGroupName === "Post_Customfieldsposts_Content_Video") {
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

export default PostContent;
