import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchCurrentUserApi } from './globalApi';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface GlobalState {
  readonly currentUser: User | null;
}

export const initialState: GlobalState = {
  currentUser: null,
};

export const fetchCurrentUser = createAsyncThunk(
  'global/fetchCurrentUser',
  async () => {
    const { data } = await fetchCurrentUserApi();
    return { user: data.data };
  }
);

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      const { user } = action.payload;

      state.currentUser = user;
    });
  },
});

export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;
