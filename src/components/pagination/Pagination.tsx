import Link from 'next/link';
import React, { Dispatch, FC, SetStateAction } from 'react';

import styles from '@/styles/components/pagination/pagination.module.scss';

type Props = {
  activePage: number;
  pages: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  perPage: string;
};

const Pagination: FC<Props> = props => {
  const { activePage, pages, setActivePage, perPage } = props;

  const getPages = () => {
    const elements = [];
    for (let i = 1; i <= pages; i++) {
      elements.push(
        <Link
          onClick={() => setActivePage(i)}
          href={`/users?limit=${perPage}&page=${i}`}
          key={i}
          scroll={false}
          replace
        >
          <div className={styles[`${activePage === i ? 'active' : ''}`]}>
            {i < 10 ? `0${i}` : i}
          </div>
        </Link>
      );
    }
    return elements;
  };

  return (
    <div className={styles.pagination}>
      <Link
        onClick={() => activePage !== 1 && setActivePage((page: number) => page - 1)}
        href={`/users?limit=${perPage}&page=${activePage !== 1 ? activePage - 1 : 1}`}
        scroll={false}
        replace
      >
        <div
          className={`${styles['pagination-arrow ']} ${
            activePage === 1 ? 'inactive' : ''
          }`}
        >
          {'<'}
        </div>
      </Link>
      {getPages()}
      <Link
        onClick={() => activePage !== pages && setActivePage((page: number) => page + 1)}
        href={`/users?limit=${perPage}&page=${
          activePage !== pages ? activePage + 1 : pages
        }`}
        scroll={false}
        replace
      >
        <div
          className={`${styles['pagination-arrow ']} ${
            activePage === pages ? 'inactive' : ''
          }`}
        >
          {'>'}
        </div>
      </Link>
    </div>
  );
};

export default Pagination;
