import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../services/AuthService';
import type { LoginReponse } from '../types/types';

const loginThunk = createAsyncThunk<LoginReponse, string>(
  'auth/login',
  async (initData: string) => {
    const response = await AuthService.login(initData);
    return response;
  }
);

export const authThunks = {
  login: loginThunk,
};
