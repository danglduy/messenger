import { createSlice } from '@reduxjs/toolkit';

export interface Channel {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}

export interface SidebarState {
  readonly channels: Channel[];
  readonly users: User[];
}

export const initialState: SidebarState = {
  channels: [],
  users: [],
};

const globalSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
});

export default globalSlice.reducer;
