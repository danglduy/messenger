import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../sidebar/sidebarSlice';
import { RootState } from '../store';
import { fetchMessagesApi } from './messagesApi';

export interface Message {
  id: number;
  content: string;
  user_id: number;
  channel_id: number;
  user: User;
}

export interface MessagesState {
  readonly channelId: number;
  readonly messages: Message[];
}

export const initialState: MessagesState = {
  channelId: -1,
  messages: [],
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ channelId }: { channelId: number }) => {
    const { data } = await fetchMessagesApi({ channelId });
    return { messages: data.data, channelId };
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      const { messages, channelId } = action.payload;

      state.channelId = channelId;
      state.messages = messages;
    });
  },
});

export const selectMessagesState = (state: RootState) => state.messages;

export default messagesSlice.reducer;
