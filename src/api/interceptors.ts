import type { InternalAxiosRequestConfig } from 'axios';
import type { AppStore } from '../store/store';

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

export const requestSuccessInterceptor = (
  config: InternalAxiosRequestConfig
) => {
  const token = store.getState().auth.token;
  config.headers.Authorization = `Bearer ${token?.access_token}`;
  return config;
};
