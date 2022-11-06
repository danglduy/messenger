import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { startAppListening } from '../listener';
import { RootState } from '../store';
import { fetchCurrentUserApi, logoutApi } from './globalApi';

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

export const logout = createAsyncThunk('global/logout', async () => {
  await logoutApi();
});

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

startAppListening({
  actionCreator: logout.fulfilled,
  effect: (action, listenerApi) => {
    window.location.reload();
  },
});

export const selectGlobal = (state: RootState) => state.global;

export default globalSlice.reducer;
