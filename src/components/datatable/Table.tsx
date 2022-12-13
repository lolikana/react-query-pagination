import React from 'react';

import { useSortableTable } from '@/hooks/useSortableTable';
import styles from '@/styles/components/datatable/table.module.scss';

import TBody from './TBody';
import THead from './THead';
import { ITableColumns } from './types/types';

type Props<T> = {
  data: T[];
  columns: ITableColumns[];
  emptyData: string;
};

const Table = <T extends Record<string, any>>(props: Props<T>) => {
  const { data, columns, emptyData } = props;
  const [tableData, handleSorting] = useSortableTable(data);

  return (
    <>
      <div className={styles.container}>
        <table className={styles.container__table}>
          <THead {...{ columns, handleSorting }} />
          <TBody {...{ columns, emptyData }} tableData={tableData} />
        </table>
      </div>
    </>
  );
};

export default Table;
