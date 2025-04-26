import { translate } from "../../utils";
import Container from "../Container";
import styles from "./styles.module.scss";
import Item from "./Item";
import { NextImage, Person } from "../../types";

const TheamPhotos = ({
  people,
  Image,
}: {
  people: Person[];
  Image: NextImage;
}) => {
  return (
    <Container>
      <div className={styles.heading}>{translate("Our Lovely Team")}</div>
      <div className={styles.people}>
        {people.map((person) => {
          return <Item key={person.name} person={person} Image={Image} />;
        })}
      </div>
    </Container>
  );
};

export default TheamPhotos;
