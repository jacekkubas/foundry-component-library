"use client";
import Container from "../../Container";
import styles from "./styles.module.scss";
import { casesPerPage } from "../../../queries/getCasesPage";
import { NextRouter, NextSearchParams } from "../../../types";

const Pagination = ({
  total,
  currentPage,
  useRouter,
  useSearchParams,
}: {
  total: number;
  currentPage: number;
  useRouter: () => NextRouter;
  useSearchParams: () => NextSearchParams;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const numberOfPages = Math.ceil(total / casesPerPage);
  const array = [...Array(numberOfPages).keys()];

  const handleClick = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: true });
  };

  return (
    <Container>
      <div className={styles.pagination}>
        {array.map((page) => {
          if (currentPage === page + 1) {
            return (
              <span
                key={page + 1}
                className={`${styles.indicator} ${styles.current}`}>
                {page + 1}
              </span>
            );
          }

          return (
            <button
              key={page + 1}
              className={styles.indicator}
              onClick={() => {
                handleClick(page + 1);
              }}>
              {page + 1}
            </button>
          );
        })}
      </div>
    </Container>
  );
};

export default Pagination;
