import { api } from '../../../api/api';
import type { LoginReponse } from '../types/types';

const login = async (initData: string): Promise<LoginReponse> => {
  const response = await api.post('auth/login', {
    initData,
  });

  return response.data;
};

const getUser = async (telegramId: string) => {
  const response = await api.get(`user/${telegramId}`);

  return response.data;
};

export const AuthService = {
  login,
  getUser,
};
