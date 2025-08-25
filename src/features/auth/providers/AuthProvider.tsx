import { useEffect, type FC, type PropsWithChildren } from 'react';
import { Spinner } from '../../../components/Spinner';
import { StaticAlert } from '../../../components/StaticAlert';
import { MOCK_INIT_DATA } from '../../../mocks';
import { StateStatus } from '../../../store/types';
import { useAuthSelectors } from '../store/auth.selectors';
import { useAuthActionCreators } from '../store/auth.slice';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuthSelectors();
  const authActions = useAuthActionCreators();

  const isAuthenticated = auth.isAuthenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      if (import.meta.env.VITE_APP_MODE === 'test') {
        authActions.login(window.Telegram.WebApp.initData);
      } else {
        authActions.login(MOCK_INIT_DATA);
      }
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        children
      ) : auth.status === StateStatus.LOADING ? (
        <Spinner />
      ) : (
        <StaticAlert
          type="error"
          message="Помилка!"
          description="Щось не так з авторизацією"
        />
      )}
    </>
  );
};
