import React, { Dispatch, FC, SetStateAction } from 'react';

import styles from '@/styles/components/pagination/pagination.module.scss';

type Props = {
  activePage: number;
  pages: number;
  setActivePage: Dispatch<SetStateAction<number>>;
};

const Pagination: FC<Props> = props => {
  const { activePage, pages, setActivePage } = props;

  const getPages = () => {
    const elements = [];
    for (let i = 1; i <= pages; i++) {
      elements.push(
        <div
          className={styles[`${activePage === i ? 'active' : ''}`]}
          onClick={() => setActivePage(i)}
          key={i}
        >
          {i < 10 ? `0${i}` : i}
        </div>
      );
    }
    return elements;
  };

  return (
    <div className={styles.pagination}>
      <div
        className={`${styles['pagination-arrow ']} ${activePage === 1 ? 'inactive' : ''}`}
        onClick={() => activePage !== 1 && setActivePage((page: number) => page - 1)}
      >
        {'<'}
      </div>
      {getPages()}
      <div
        className={`${styles['pagination-arrow ']} ${
          activePage === pages ? 'inactive' : ''
        }`}
        onClick={() => activePage !== pages && setActivePage((page: number) => page + 1)}
      >
        {'>'}
      </div>
    </div>
  );
};

export default Pagination;
