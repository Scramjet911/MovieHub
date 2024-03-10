import Config from 'react-native-config';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import baseApi from '../api/baseApi';
import storeLogger from './logger';
import { movieSlice } from './slices/MovieSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [movieSlice.name]: movieSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    const list = [baseApi.middleware];
    if (Config.NODE_ENV === 'debug') {
      list.push(storeLogger);
    }
    return getDefaultMiddleware().concat(list);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
