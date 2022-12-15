import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TUser, TUsersTotal } from '@/libs/types';

const url = 'https://63992ce7fe03352a94e80a19.mockapi.io';

export const getUsers = async (
  sortBy: string | null,
  order: 'asc' | 'desc',
  activePage: number,
  perPage: string
): Promise<TUser[]> => {
  const res = await axios.get(
    `${url}/users?${
      sortBy != null && 'sortBy=' + sortBy + '&'
    }order=${order}&limit=${perPage}&page=${activePage}`
  );
  const { data } = res;
  return data;
};

export const useUsers = (
  sortBy: string | null,
  order: 'asc' | 'desc',
  activePage: number,
  perPage: string
) => {
  const queryResult = useQuery({
    queryKey: ['users', sortBy, order, activePage, perPage],
    queryFn: () => getUsers(sortBy, order, activePage, perPage),
    keepPreviousData: true
  });

  return { users: queryResult.data ?? [], ...queryResult };
};

export const getUsersTotal = async (): Promise<TUsersTotal> => {
  const res = await axios.get(`${url}/usersTotal`);
  const { data } = res;
  return data[0];
};

export const useUsersTotal = () => {
  const queryResult = useQuery({
    queryKey: ['usersTotal'],
    queryFn: () => getUsersTotal(),
    keepPreviousData: true
  });

  return { users: queryResult.data ?? [], ...queryResult };
};
