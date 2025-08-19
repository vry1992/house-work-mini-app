import { useEffect, type FC, type PropsWithChildren } from 'react';
import { AuthService } from '../services/AuthService';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    AuthService.login(window.Telegram.WebApp.initData);
  }, []);

  return <>{children}</>;
};
