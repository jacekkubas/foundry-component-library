import Container from "../../Container";
import styles from "./styles.module.scss";
import Arrow from "../../../assets/svg/caret-right.svg";
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
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h3 className={styles.heading}>{translate("Other projects")}</h3>
          <div className={styles.button}>
            <Link href="/cases">{translate("See all")}</Link>
          </div>
        </div>
        <div className={styles.cases}>
          {cases.map((item) => {
            const { thumbnailImage, mainImage } = item.case;

            return (
              <div key={item.id} className={styles.case}>
                <Link href={item.uri}>
                  <div className={styles.image}>
                    {item.case.mainImage && (
                      <Image
                        className={styles.image}
                        src={
                          thumbnailImage?.sourceUrl ||
                          mainImage?.sourceUrl ||
                          ""
                        }
                        alt={item.title || ""}
                        width={400}
                        height={490}
                      />
                    )}
                  </div>
                  <div className={styles.texts}>
                    <div>{item.title}</div>
                    <Arrow />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default Other;
