export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export interface TUsers {
  page: number;
  per_page: number;
  total: number;
  total_page: number;
  data: TUser[];
}
