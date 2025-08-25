import axios from 'axios';
import { requestSuccessInterceptor } from './interceptors';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

api.interceptors.request.use(requestSuccessInterceptor);
