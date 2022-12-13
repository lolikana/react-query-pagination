import React, { FC, useState } from 'react';

import styles from '@/styles/components/datatable/table.module.scss';

import { ITableColumns } from './types/types';

type Props = {
  columns: ITableColumns[];
  handleSorting: (sortField: string, sortOrder: 'asc' | 'desc') => void;
};

const THead: FC<Props> = props => {
  const { columns, handleSorting } = props;

  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === 'asc'
              ? 'up'
              : sortField === accessor && order === 'desc'
              ? 'down'
              : 'default'
            : '';
          return (
            <th
              key={accessor}
              className={`${cl && styles[cl]}`}
              onClick={sortable ? () => handleSortingChange(accessor) : undefined}
            >
              <span>{label}</span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default THead;
