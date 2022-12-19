import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TUser, TUsersTotal } from '@/libs/types';

const url = 'https://63992ce7fe03352a94e80a19.mockapi.io';

export const getDatas = async (
  queryUrl: string,
  sortBy: string | null,
  order: 'asc' | 'desc',
  activePage: number,
  perPage: string
): Promise<TUser[]> => {
  const res = await axios.get(`${url}/${queryUrl}`, {
    params: {
      sortBy,
      order,
      limit: perPage,
      page: activePage
    }
  });
  const { data } = res;
  return data;
};

export const useQueryDatas = (
  queryUrl: string,
  sortBy: string | null,
  order: 'asc' | 'desc',
  activePage: number,
  perPage: string
) => {
  const queryResult = useQuery({
    queryKey: [queryUrl, sortBy, order, activePage, perPage],
    queryFn: () => getDatas(queryUrl, sortBy, order, activePage, perPage),
    keepPreviousData: true
  });

  return { users: queryResult.data ?? [], ...queryResult };
};

export const getDatasTotal = async (): Promise<TUsersTotal> => {
  const res = await axios.get(`${url}/usersTotal`);
  const { data } = res;
  return data[0];
};

export const useQueryDatasTotal = () => {
  const queryResult = useQuery({
    queryKey: ['usersTotal'],
    queryFn: () => getDatasTotal(),
    keepPreviousData: true
  });

  return { users: queryResult.data ?? [], ...queryResult };
};
