import axios, { AxiosResponse } from 'axios';
import { Message } from './messagesSlice';

export const fetchMessagesApi: ({
  channelId,
}: {
  channelId: number;
}) => Promise<AxiosResponse<{ data: Message[] }>> = async ({ channelId }) => {
  return await axios.get(`/api/channels/${channelId}/messages`);
};
