import Image from 'next/image';
import React from 'react';

import styles from '@/styles/components/DataTable/table.module.scss';

import { ITableColumns } from './types/types';

type Props<T> = {
  tableData: T[];
  columns: ITableColumns[];
  emptyData: string;
};

const TBody = <T extends Record<string, any>>(props: Props<T>) => {
  const { tableData, columns, emptyData } = props;

  if (tableData.length === 0)
    return (
      <tbody>
        <tr className={styles.container__table_empty}>
          <td colSpan={columns.length + 1}>{emptyData}</td>
        </tr>
      </tbody>
    );

  return (
    <tbody>
      {tableData.map(data => (
        <tr key={data.id}>
          {columns.map(({ accessor }) => {
            const tData = data[accessor] ? data[accessor] : 'ー';
            if (accessor === 'avatar') {
              return (
                <td key={accessor}>
                  <Image src={tData} width={40} height={40} alt="avatar" />
                </td>
              );
            }

            return <td key={accessor}>{tData}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;
