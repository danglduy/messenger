import axios, { AxiosResponse } from 'axios';
import { User } from './sidebarSlice';

export const fetchUsersApi: () => Promise<
  AxiosResponse<{ data: User[] }>
> = async () => {
  return await axios.get('/api/users');
};
