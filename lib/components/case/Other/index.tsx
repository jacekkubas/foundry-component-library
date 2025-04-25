import Container from "../../Container";
import styles from "./styles.module.scss";
import Arrow from "../../../assets/svg/arrow.svg";
import { translate } from "../../../utils";
import { Case, NextImage, NextLink } from "../../../types";

function Other({
  cases,
  Link,
  Image,
}: {
  cases: Case[];
  Link: NextLink;
  Image: NextImage;
}) {
  if (!cases) return;

  return (
    <Container>
      <div className={styles.other}>
        <div className={styles.caption}>{translate("Case Studies")}</div>
        <h3 className={styles.heading}>
          {translate("Success stories.\nWith proven results.")}
        </h3>

        <div className={styles.cases}>
          {cases.map((item) => (
            <div key={item.id} className={styles.case}>
              <Link href={item.uri}>
                <div className={styles.image}>
                  {item.case.mainImage && (
                    <Image
                      className={styles.image}
                      src={item.case.mainImage.sourceUrl}
                      alt={item.title || ""}
                      width={308}
                      height={220}
                    />
                  )}
                </div>
                <div className={styles.texts}>
                  <div>
                    <div className={styles.title}>{item.title}</div>
                    {item.case.excerpt && <div>{item.case.excerpt}</div>}
                  </div>
                  <div className={styles.more}>
                    {translate("See More")}
                    <Arrow />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <Link className={styles.button} href="/cases">
            {translate("See All")}
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Other;
