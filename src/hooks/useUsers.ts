import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TUsers } from '@/libs/types';

const url = 'https://63992ce7fe03352a94e80a19.mockapi.io';

export const getUsers = async (activePage: number, perPage: string): Promise<TUsers> => {
  const res = await axios.get(`${url}/users?per_page=${perPage}&page=${activePage}`);
  const { data } = res;
  return data[0];
};

export const useUsers = (activePage: number, perPage: string) => {
  return useQuery({
    queryKey: ['users', activePage, perPage],
    queryFn: () => getUsers(activePage, perPage),
    keepPreviousData: true
  });
};
