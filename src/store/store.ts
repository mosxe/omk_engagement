import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Tab } from 'types';
import { API } from './apiSlice';
// import filtersReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer
    // filters: filtersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const initialState = {
  filters: [],
  tab: 'engagement' as Tab,
  isError: false,
  errorMessage: ''
};
