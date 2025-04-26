import styles from "./styles.module.scss";
import { NextImage, Post } from "../../../types";
import TextSection from "../../TextSection";

function Top({ data, Image }: { data?: Post; Image: NextImage }) {
  if (!data) return;

  const { excerpt, thumbnailImage } = data.CustomFieldsPosts;

  return (
    <>
      <div className={styles.mainImage}>
        <Image src={thumbnailImage.sourceUrl || ""} alt={data.title} fill />
      </div>
      <TextSection caption="Blog Article" heading={data.title} text={excerpt} />
    </>
  );
}

export default Top;
