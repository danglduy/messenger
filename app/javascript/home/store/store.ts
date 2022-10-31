import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './global/globalSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import messagesReducer from './messages/messagesSlice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    sidebar: sidebarReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
