import styles from "../Paginator/Paginator.module.css";
import React from "react";

let PaginatorD = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagesList}>
      {pages
        .map((p) => {
          return (
            <span
              key={p}
              className={
                currentPage === p ? styles.selectedPage : styles.pageNumber
              }
              onClick={() => {
                onPageChanged(p);
              }}
            >
              {` ${p} `}
            </span>
          );
        })
        .slice(currentPage - 5 < 0 ? 0 : currentPage - 5, currentPage + 4)}
    </div>
  );
};

export default PaginatorD;
