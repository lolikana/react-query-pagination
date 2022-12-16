import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Table from '@/components/datatable/Table';
import SelectPerPage from '@/components/form/SelectPerPage';
import Paginations from '@/components/pagination/Pagination';
import { getUsers, useUsers, useUsersTotal } from '@/hooks/useUsers';
import { queryClient } from '@/libs/ReactQuery';
import { USER_LIST_COLUMNS } from '@/libs/THeadColumns';

const Users: NextPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState('5');
  const [sortBy, setSortBy] = useState<string>('first_name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();

  const { data, isPreviousData, isLoading } = useUsers(
    sortBy,
    order,
    activePage,
    perPage
  );
  const { data: dataTotal } = useUsersTotal();

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
  }, [perPage, sortBy, order, activePage]);

  useEffect(() => {
    if (!isPreviousData && data && dataTotal) {
      if (activePage !== +dataTotal.total / +perPage) {
        queryClient.prefetchQuery({
          queryKey: ['users', sortBy, order, activePage + 1, perPage],
          queryFn: () => getUsers(sortBy, order, activePage + 1, perPage)
        });
      }

      if (activePage !== 1) {
        queryClient.prefetchQuery({
          queryKey: ['users', sortBy, order, activePage - 1, perPage],
          queryFn: () => getUsers(sortBy, order, activePage - 1, perPage)
        });
      }
    }
  }, [data, isPreviousData, queryClient]);

  return (
    <>
      <Table
        data={data ? data : []}
        columns={USER_LIST_COLUMNS}
        emptyData="no users found"
        handleSorting={handleSorting}
        isLoading={isLoading}
      />
      <SelectPerPage
        setPerPage={setPerPage}
        setActivePage={setActivePage}
        perPage={perPage}
      />
      <Paginations
        currentPage={activePage}
        totalCount={dataTotal ? +dataTotal.total : 0}
        pageSize={Number(perPage)}
        onPageChange={setActivePage}
        siblingCount={1}
        sortBy={sortBy}
        order={order}
      />
      <Link
        href={'/'}
        style={{
          display: 'block',
          textAlign: 'center',
          margin: '2rem auto',
          padding: '1rem 2rem',
          backgroundColor: '#6e6b7b',
          width: 'fit-content'
        }}
      >
        <div>Go back Index</div>
      </Link>
    </>
  );
};

export default Users;
