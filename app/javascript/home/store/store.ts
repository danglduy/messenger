import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './global/slice';
import sidebarSlice from './sidebar/slice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    sidebar: sidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
