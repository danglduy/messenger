import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  fetchChannelsApi,
  fetchUsersApi,
  createDirectConversationApi,
} from './sidebarApi';

export interface Channel {
  id: number;
  name: string;
  channel_type: 'group' | 'direct';
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface SidebarState {
  readonly channels: Channel[];
  readonly users: User[];
  readonly directChannelsUserIds: Record<number, number[]>;
}

export const initialState: SidebarState = {
  channels: [],
  users: [],
  directChannelsUserIds: {},
};

export const fetchChannels = createAsyncThunk(
  'sidebar/fetchChannels',
  async () => {
    const response = await fetchChannelsApi();
    const { data, direct_channels_user_ids } = response.data;
    return { data: data, direct_channels_user_ids };
  }
);

export const fetchUsers = createAsyncThunk('sidebar/fetchUsers', async () => {
  const { data } = await fetchUsersApi();
  return data.data;
});

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      const { data: channels, direct_channels_user_ids } = action.payload;

      state.channels = channels;
      state.directChannelsUserIds = direct_channels_user_ids;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectSidebar = (state: RootState) => state.sidebar;
export const selectChannels = createSelector(
  selectSidebar,
  (state) => state.channels
);
export const selectGroupChannels = createSelector(selectChannels, (channels) =>
  channels.filter((channel) => channel.channel_type === 'group')
);

export default sidebarSlice.reducer;
