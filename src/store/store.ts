import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/store/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
