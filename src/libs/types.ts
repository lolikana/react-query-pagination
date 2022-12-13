export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
export interface TUsers {
  per_page: number;
  total: number;
  total_pages: number;
  page: number;
  data: TUser[];
}
