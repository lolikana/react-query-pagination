import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { getDatas, useQueryDatas, useQueryDatasTotal } from '@/hooks/useUsers';
import { queryClient } from '@/libs/ReactQuery';
import styles from '@/styles/components/datatable/table.module.scss';

import SelectPerPage from '../form/SelectPerPage';
import Pagination from '../pagination/Pagination';
import TBody from './TBody';
import THead from './THead';
import { ITableColumns } from './types/types';

type Props = {
  queryUrl: string;
  columns: ITableColumns[];
  emptyData: string;
};

const Table = (props: Props) => {
  const { columns, emptyData, queryUrl } = props;
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState('5');
  const [sortBy, setSortBy] = useState<string>('first_name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();

  const { data, isLoading, isPreviousData } = useQueryDatas(
    queryUrl,
    sortBy,
    order,
    activePage,
    perPage
  );
  const { data: dataTotal } = useQueryDatasTotal();

  const handleSorting = (accessor: string, order: 'asc' | 'desc') => {
    setSortBy(accessor);
    setOrder(order);
  };

  useEffect(() => {
    router.push(
      {
        pathname: '/users',
        query: {
          sortBy: sortBy,
          order: order,
          limit: perPage,
          page: activePage
        }
      },
      undefined,
      { scroll: false }
    );
  }, [sortBy, order, activePage, perPage]);

  useEffect(() => {
    if (!isPreviousData && data && dataTotal) {
      if (activePage !== +dataTotal.total / +perPage) {
        queryClient.prefetchQuery({
          queryKey: [queryUrl, sortBy, order, activePage + 1, perPage],
          queryFn: () => getDatas(queryUrl, sortBy, order, activePage + 1, perPage)
        });
      }

      if (activePage !== 1) {
        queryClient.prefetchQuery({
          queryKey: [queryUrl, sortBy, order, activePage - 1, perPage],
          queryFn: () => getDatas(queryUrl, sortBy, order, activePage - 1, perPage)
        });
      }
    }
  }, [data, isPreviousData]);

  if (isLoading) return <div>Loading Data</div>;

  return (
    <>
      <div className={styles.container}>
        <table className={styles.container__table}>
          <THead {...{ columns, handleSorting }} />
          <TBody {...{ columns, emptyData }} tableData={data ? data : []} />
        </table>
      </div>
      <SelectPerPage
        setPerPage={setPerPage}
        setActivePage={setActivePage}
        perPage={perPage}
      />
      <Pagination
        currentPage={activePage}
        totalCount={dataTotal ? +dataTotal.total : 0}
        pageSize={Number(perPage)}
        onPageChange={setActivePage}
        siblingCount={1}
      />
    </>
  );
};

export default Table;
