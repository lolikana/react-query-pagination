import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TUser, TUsersTotal } from '@/libs/types';

const url = 'https://63992ce7fe03352a94e80a19.mockapi.io';

export const getUsers = async (activePage: number, perPage: string): Promise<TUser[]> => {
  const res = await axios.get(`${url}/users?limit=${perPage}&page=${activePage}`);
  const { data } = res;
  return data;
};

export const useUsers = (activePage: number, perPage: string) => {
  return useQuery({
    queryKey: ['users', activePage, perPage],
    queryFn: () => getUsers(activePage, perPage),
    keepPreviousData: true
  });
};

export const getUsersTotal = async (): Promise<TUsersTotal> => {
  const res = await axios.get(`${url}/usersTotal`);
  const { data } = res;
  return data[0];
};

export const useUsersTotal = () => {
  return useQuery({
    queryKey: ['usersTotal'],
    queryFn: () => getUsersTotal(),
    keepPreviousData: true
  });
};
