import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TUsers } from '@/libs/types';

const url = 'http://localhost:4000';

export const getUsers = async (activePage: number): Promise<TUsers> => {
  const res = await axios.get(`${url}/users?page=${activePage}`);
  const { data } = res;
  return data[0];
};

export const useUsers = (activePage: number) => {
  return useQuery({
    queryKey: ['users', activePage],
    queryFn: () => getUsers(activePage),
    keepPreviousData: true
  });
};
