import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Table from '@/components/datatable/Table';
import SelectPerPage from '@/components/form/SelectPerPage';
import Pagination from '@/components/pagination/Pagination';
import { useUsers } from '@/hooks/useUsers';
import { USER_LIST_COLUMNS } from '@/libs/THeadColumns';

const Users: NextPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState('5');
  const router = useRouter();
  
  const { data, isFetching, isLoading } = useUsers(activePage, perPage);
  
  useEffect(() => {
    router.push({
      pathname: '/users',
      query: {
        per_page: perPage,
        page: activePage
      }
    });
  }, [perPage]);

  if (isLoading) return <div>Loading</div>;
  
  if (isFetching) return <div>Fetching users</div>;

  return (
    <>
      <Table
        data={data ? data.data : []}
        columns={USER_LIST_COLUMNS}
        emptyData="no users found"
      />
      <SelectPerPage
        setPerPage={setPerPage}
        setActivePage={setActivePage}
        perPage={perPage}
      />
      <Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        pages={data ? data.total_pages : 0}
        perPage={perPage}
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
