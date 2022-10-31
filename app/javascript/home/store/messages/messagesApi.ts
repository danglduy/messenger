import axios, { AxiosResponse } from 'axios';
import { Message } from './messagesSlice';

export const fetchMessagesApi: ({
  channelId,
}: {
  channelId: number;
}) => Promise<AxiosResponse<{ data: Message[] }>> = async ({ channelId }) => {
  return await axios.get(`/api/channels/${channelId}/messages`);
};

export const sendMessageApi: ({
  channelId,
  messageContent,
}: {
  channelId: number;
  messageContent: string;
}) => Promise<AxiosResponse<{ data: Message }>> = async ({
  channelId,
  messageContent,
}) => {
  return await axios.post(`/api/channels/${channelId}/messages`, {
    content: messageContent,
  });
};
