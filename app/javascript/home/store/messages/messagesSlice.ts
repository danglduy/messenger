import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../sidebar/sidebarSlice';
import { RootState } from '../store';
import { fetchMessagesApi, sendMessageApi } from './messagesApi';

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

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({
    channelId,
    messageContent,
  }: {
    channelId: number;
    messageContent: string;
  }) => {
    const { data } = await sendMessageApi({ channelId, messageContent });
    return { message: data.data };
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;

      if (
        !state.messages
          .map((stateMessage) => stateMessage.id)
          .includes(message.id)
      ) {
        state.messages.push(message);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      const { messages, channelId } = action.payload;

      state.channelId = channelId;
      state.messages = messages;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const { message } = action.payload;

      if (
        !state.messages
          .map((stateMessage) => stateMessage.id)
          .includes(message.id)
      ) {
        state.messages.push(message);
      }
    });
  },
});

export const selectMessagesState = (state: RootState) => state.messages;
export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
