"use client";
import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";
import Dropdown from "./Dropdown";
import Container from "../../Container";
import { NextRouter } from "../../../types";

const Top = ({
  services,
  industries,
  selected,
  setSelected,
  useRouter,
}: {
  services: string[];
  industries: string[];
  selected: {
    category: string;
    tag: string;
  };
  setSelected: Dispatch<
    SetStateAction<{
      category: string;
      tag: string;
    }>
  >;
  useRouter: () => NextRouter;
}) => {
  const router = useRouter();
  if (!services) return;

  return (
    <Container>
      <div className={styles.filterBtns}>
        <button
          className={`${styles.filterBtn} ${
            selected?.tag === "featured" ? styles.active : ""
          }`}
          onClick={() => {
            setSelected({ category: "featured", tag: "featured" });
            const params = new URLSearchParams();
            router.push(`?${params.toString()}`);
          }}
        >
          featured
        </button>

        <Dropdown
          heading="Service"
          items={[...services]}
          selected={selected}
          setSelected={setSelected}
          useRouter={useRouter}
        />
        <Dropdown
          heading="Industry"
          items={[...industries]}
          selected={selected}
          setSelected={setSelected}
          useRouter={useRouter}
        />
      </div>
    </Container>
  );
};

export default Top;
