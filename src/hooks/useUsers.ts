import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TUsers } from '@/libs/types';

export const getUsers = async (activePage: number): Promise<TUsers> => {
  const res = await axios.get(`https://reqres.in/api/users?page=${activePage}`);
  const { data } = res;
  return data;
};

export const useUsers = (activePage: number) => {
  return useQuery({
    queryKey: ['users', activePage],
    queryFn: () => getUsers(activePage),
    keepPreviousData: true
  });
};
