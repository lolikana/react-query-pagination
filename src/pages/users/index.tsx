import { NextPage } from 'next';
import React, { useState } from 'react';

import Table from '@/components/datatable/Table';
import Pagination from '@/components/pagination/Pagination';
import { useUsers } from '@/hooks/useUsers';
import { USER_LIST_COLUMNS } from '@/libs/THeadColumns';

const Users: NextPage = () => {
  const [activePage, setActivePage] = useState(1);

  const { data, isFetching, isLoading } = useUsers(activePage);

  if (isLoading) return <div>Loading</div>;

  if (isFetching) return <div>Fetching users</div>;

  return (
    <>
      <Table
        data={data ? data.data : []}
        columns={USER_LIST_COLUMNS}
        emptyData="no users found"
      />
      <Pagination activePage={activePage} setActivePage={setActivePage} pages={2} />
    </>
  );
};

export default Users;
