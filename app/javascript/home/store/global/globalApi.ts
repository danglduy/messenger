import axios, { AxiosResponse } from 'axios';
import { User } from '../sidebar/sidebarSlice';

export const fetchCurrentUserApi: () => Promise<
  AxiosResponse<{ data: User }>
> = async () => {
  return await axios.get(`/api/users/me`);
};

export const logoutApi = async () => {
  return await axios.delete('/api/logout');
};
