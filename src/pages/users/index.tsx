import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import Table from '@/components/datatable/Table';
import { USER_LIST_COLUMNS } from '@/libs/THeadColumns';

const Users: NextPage = () => {
  return (
    <>
      <Table columns={USER_LIST_COLUMNS} emptyData="no users found" queryUrl="users" />
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
