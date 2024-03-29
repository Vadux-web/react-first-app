import styles from "../../Users/users.module.css";
import React from "react";

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged }) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagesList}>
      <button
        disabled={currentPage < 10}
        onClick={() => {
          onPageChanged(currentPage - 9);
        }}
      >
        Prev
      </button>
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
      <button
        disabled={currentPage > totalItemsCount - 2}
        onClick={() => {
          onPageChanged(currentPage + 9);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
