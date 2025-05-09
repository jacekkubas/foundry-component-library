"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Container from "../Container";
import Dropdown from "./Dropdown";
import { NextImage } from "../../types";
import { motion, AnimatePresence } from "motion/react";

type Brand = {
  data?: {
    title?: string;
    featured?: boolean;
    image?: {
      sourceUrl: string;
    };
  };
  service?: string[];
  industry?: string[];
};

const Logos = ({
  brands = [],
  withoutFilters,
  Image,
}: {
  brands: Brand[];
  withoutFilters?: boolean;
  Image: NextImage;
}) => {
  const [selected, setSelected] = useState({
    category: "featured",
    tag: "featured",
  });
  const services: Set<string> = new Set();
  const industries: Set<string> = new Set();
  const [brandsToShow, setBrandsToShow] = useState<Brand[]>([]);

  brands.forEach((brand) => {
    brand.service?.forEach((service) => services.add(service));
    brand.industry?.forEach((industry) => industries.add(industry));
  });

  useEffect(() => {
    if (withoutFilters) {
      setBrandsToShow(brands);
      return;
    }

    setBrandsToShow([]);

    setTimeout(() => {
      setBrandsToShow(
        brands.filter((brand) => {
          if (selected.category === "featured" && brand.data?.featured) {
            return true;
          }
          if (
            selected.category === "service" &&
            brand.service?.includes(selected.tag)
          ) {
            return true;
          }
          if (
            selected.category === "industry" &&
            brand.industry?.includes(selected.tag)
          ) {
            return true;
          }
          return false;
        })
      );
    }, 400);

    if (withoutFilters) {
      setBrandsToShow(brands);
    }
  }, [selected]);

  console.log(brandsToShow);

  return (
    <Container>
      {!withoutFilters && (
        <div className={styles.filterBtns}>
          <button
            className={`${styles.filterBtn} ${
              selected.tag === "featured" ? styles.active : ""
            }`}
            onClick={() => {
              setSelected({ category: "featured", tag: "featured" });
            }}
          >
            featured
          </button>

          <Dropdown
            heading="Service"
            items={[...services]}
            selected={selected}
            setSelected={setSelected}
          />
          <Dropdown
            heading="Industry"
            items={[...industries]}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      )}

      <div className={styles.logos}>
        <AnimatePresence>
          {brandsToShow.map((brand, i) => {
            const { data } = brand;
            if (!data?.image) return;

            return (
              <motion.div
                key={data?.title || "" + i}
                className={styles.image}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45 }}
                layout
              >
                <Image
                  src={data?.image?.sourceUrl || ""}
                  alt={data?.title || ""}
                  fill
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default Logos;
