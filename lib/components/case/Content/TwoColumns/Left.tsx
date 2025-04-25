import styles from "../styles.module.scss";
import Video from "../Video";
import { ColumnOption, NextImage } from "../../../../types";

const Left = ({
  section,
  Image,
}: {
  section: ColumnOption;
  Image: NextImage;
}) => {
  if (!section) return null;

  return (
    <div className={styles.columnContent}>
      {/* case */}
      {section.fieldGroupName === "Case_Case_Content_Twocolumns_Left_Text" && (
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: section.text }}
        />
      )}
      {section.fieldGroupName === "Case_Case_Content_Twocolumns_Left_Image" &&
        section.image && (
          <>
            <Image
              className={styles.image}
              src={section.image.sourceUrl}
              alt={section.caption ? section.caption : "foundry digital agency"}
              layout="intrinsic"
              width={600}
              height={600}
            />
            {section.caption && (
              <div className={styles.caption}>{section.caption}</div>
            )}
          </>
        )}
      {section.fieldGroupName === "Case_Case_Content_Twocolumns_Left_Video" && (
        <Video section={section} />
      )}
    </div>
  );
};

export default Left;
