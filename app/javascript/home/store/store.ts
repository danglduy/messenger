import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './global/globalSlice';
import sidebarReducer from './sidebar/sidebarSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
