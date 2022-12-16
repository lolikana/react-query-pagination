import React, { useEffect, useState } from 'react';

import styles from '@/styles/components/datatable/table.module.scss';

import TBody from './TBody';
import THead from './THead';
import { ITableColumns } from './types/types';

type Props<T> = {
  data: T[];
  columns: ITableColumns[];
  emptyData: string;
  handleSorting: (sortField: string, sortOrder: 'asc' | 'desc') => void;
  isLoading: boolean;
};

const Table = <T extends Record<string, any>>(props: Props<T>) => {
  const { data, columns, emptyData, handleSorting, isLoading } = props;
  const [reloadData, setReloadData] = useState(data);

  useEffect(() => {
    setReloadData(data);
  }, [data]);

  return (
    <>
      <div className={styles.container}>
        <table className={styles.container__table}>
          <THead {...{ columns, handleSorting }} />
          <TBody
            {...{ columns, emptyData }}
            tableData={reloadData}
            isLoading={isLoading}
          />
        </table>
      </div>
    </>
  );
};

export default Table;
