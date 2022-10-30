import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User }>) {
      state.currentUser = action.payload.user;
    },
  },
});

export const { setUser } = globalSlice.actions;
export default globalSlice.reducer;
