import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchUsersApi } from './sidebarApi';

export interface Channel {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface SidebarState {
  readonly channels: Channel[];
  readonly users: User[];
  readonly usersFetched: boolean;
}

export const initialState: SidebarState = {
  channels: [],
  users: [],
  usersFetched: false,
};

export const fetchUsers = createAsyncThunk('sidebar/fetchUsers', async () => {
  const { data } = await fetchUsersApi();
  return data.data;
});

const globalSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.usersFetched = true;
    });
  },
});

export const selectSidebar = (state: RootState) => state.sidebar;

export default globalSlice.reducer;
