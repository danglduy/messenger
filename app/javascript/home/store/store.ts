import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './global/globalSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import messagesReducer from './messages/messagesSlice';
import { listenerMiddleware } from './listener';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    sidebar: sidebarReducer,
    messages: messagesReducer,
  },
  middleware: (createListenerMiddleware) =>
    createListenerMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
