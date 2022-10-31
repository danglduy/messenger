import axios, { AxiosResponse } from 'axios';
import { Channel, User } from './sidebarSlice';

export const fetchChannelsApi: () => Promise<
  AxiosResponse<{
    data: Channel[];
    direct_channels_user_ids: Record<number, number[]>;
  }>
> = async () => {
  return await axios.get('/api/channels');
};

export const fetchUsersApi: () => Promise<
  AxiosResponse<{ data: User[] }>
> = async () => {
  return await axios.get('/api/users');
};

export const createDirectConversationApi: ({
  userId,
}: {
  userId: number;
}) => Promise<AxiosResponse<{ data: Channel }>> = async ({ userId }) => {
  return await axios.post('/api/channels', {
    user_id: userId,
    channel_type: 'direct',
  });
};
