import { api } from '../../../api/api';

const login = async (initData: string) => {
  const response = await api.post('auth/login', {
    initData,
  });

  console.log(response);
};

export const AuthService = {
  login,
};
