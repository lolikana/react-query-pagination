import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TUser, TUsersTotal } from '@/libs/types';
const isProduction = process.env.NODE_ENV === 'production';
const url = isProduction
  ? 'https://63992ce7fe03352a94e80a19.mockapi.io'
  : 'http://localhost:4000';

export const getDatas = async (
  queryUrl: string,
  sortBy: string | null,
  order: 'asc' | 'desc',
  activePage: number,
  perPage: string
): Promise<TUser[]> => {
  const res = await axios.get(`${url}/${queryUrl}`, {
    params: {
      [isProduction ? 'sortBy' : '_sort']: sortBy,
      [isProduction ? 'order' : '_order']: order,
      [isProduction ? 'limit' : '_limit']: perPage,
      [isProduction ? 'page' : '_page']: activePage
    }
  });
  const { data } = res;
  return isProduction ? data : data;
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
  console.log(queryResult.data);
  return { users: queryResult.data ?? [], ...queryResult };
};

export const getDatasTotal = async (): Promise<TUsersTotal> => {
  const res = await axios.get(`${url}/usersTotal`);
  const { data } = res;
  return isProduction ? data[0] : { total: data.total };
};

export const useQueryDatasTotal = () => {
  const queryResult = useQuery({
    queryKey: ['usersTotal'],
    queryFn: () => getDatasTotal(),
    keepPreviousData: true
  });

  return { users: queryResult.data ?? [], ...queryResult };
};
