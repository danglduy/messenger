import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchChannelsApi, fetchUsersApi } from './sidebarApi';

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
  readonly channelsFetched: boolean;
  readonly users: User[];
  readonly usersFetched: boolean;
}

export const initialState: SidebarState = {
  channels: [],
  channelsFetched: false,
  users: [],
  usersFetched: false,
};

export const fetchChannels = createAsyncThunk(
  'sidebar/fetchChannels',
  async () => {
    const { data } = await fetchChannelsApi();
    return data.data;
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
      state.channels = action.payload;
      state.channelsFetched = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.usersFetched = true;
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
