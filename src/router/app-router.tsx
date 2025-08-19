import { Button } from 'antd';
import { type FC, type PropsWithChildren } from 'react';
import { Outlet, createBrowserRouter, useNavigate } from 'react-router';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const nav = useNavigate();
  const isAuth = true;

  return isAuth ? (
    <>
      Children: {children} <Button onClick={() => nav('/login')} />{' '}
    </>
  ) : null;
};

function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <>Home</> },
        { path: 'dashboard', element: <>Dashboard</> },
      ],
    },
    { path: '/login', element: <>login</> },
  ],
  { basename: '/house-work-mini-app' }
);
