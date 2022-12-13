import { NextPage } from 'next';
import React, { useState } from 'react';

import Table from '@/components/datatable/Table';
import SelectPerPage from '@/components/form/SelectPerPage';
import Pagination from '@/components/pagination/Pagination';
import { useUsers } from '@/hooks/useUsers';
import { USER_LIST_COLUMNS } from '@/libs/THeadColumns';

const Users: NextPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState('5');

  const { data, isFetching, isLoading } = useUsers(activePage, perPage);

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
      />
    </>
  );
};

export default Users;
