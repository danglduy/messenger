import axios, { AxiosResponse } from 'axios';
import { Channel, User } from './sidebarSlice';

export const fetchChannelsApi: () => Promise<
  AxiosResponse<{ data: Channel[] }>
> = async () => {
  return await axios.get('/api/channels');
};

export const fetchUsersApi: () => Promise<
  AxiosResponse<{ data: User[] }>
> = async () => {
  return await axios.get('/api/users');
};
