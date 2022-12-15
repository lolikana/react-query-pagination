// import Link from 'next/link';
import React, { FC } from 'react';

import { DOTS, usePagination } from '@/hooks/usePagination';
import { randomNumber } from '@/libs/helpers';
import styles from '@/styles/components/pagination/pagination.module.scss';

type Props = {
  onPageChange: (arg: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  sortBy: string;
  order: string;
};

const Pagination: FC<Props> = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    sortBy,
    order
  } = props;

  const paginationRange =
    (usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize
    }) as any[]) || undefined;

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={[styles.pagination__container].join(' ')}>
      {/* Left navigation arrow */}
      <li
        className={[styles.pagination__item, currentPage === 1 && styles.disabled].join(
          ' '
        )}
        onClick={onPrevious}
      >
        <div className={[styles.arrow, styles.left].join(' ')} />
      </li>
      {paginationRange.map(pageNumber => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
              key={`dots ${randomNumber()}`}
              className={[styles.pagination__item, styles.dots].join(' ')}
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={[
              styles.pagination__item,
              pageNumber === currentPage ? styles.selected : ''
            ].join(' ')}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={[
          styles.pagination__item,
          currentPage === lastPage && styles.disabled
        ].join(' ')}
        onClick={onNext}
      >
        <div className={[styles.arrow, styles.right].join(' ')} />
      </li>
    </ul>
  );
};

export default Pagination;
