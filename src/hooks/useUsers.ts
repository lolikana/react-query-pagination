import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// import { TUsers } from '@/libs/types';

// export const getUsers = async (): Promise<TUsers> => {
//   const res = await axios.get('https://reqres.in/api/users?page=1');
//   const { data } = res;
//   return data;
// };

// export const useUsers = () => {
//   return useQuery({ queryKey: ['users'], queryFn: () => getUsers() });
// };

export const useUsers = () => {
  return useQuery(['users'], async () => {
    const { data } = await axios.get('https://reqres.in/api/users?page=1');

    return data;
  });
};
