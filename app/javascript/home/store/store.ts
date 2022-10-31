import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './global/globalSlice';
import sidebarSlice from './sidebar/sidebarSlice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    sidebar: sidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
