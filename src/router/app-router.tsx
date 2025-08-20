import { Layout, theme } from 'antd';
import { type FC, type PropsWithChildren } from 'react';
import { Outlet, createBrowserRouter } from 'react-router';
import { Header } from '../components/Header';
import { AuthProvider } from '../features/auth/providers/AuthProvider';
import { useAuthSelectors } from '../features/auth/store/auth.selectors';
import { Home } from '../features/home/pages/Home';
import { ProfileSettings } from '../features/profile-settings/page/ProfileSettings';

const { Content } = Layout;

const ProtectedLayout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthSelectors();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Layout>
        <Header photoUrl={user?.photoUrl!} />

        <Content
          style={{
            margin: 8,
            padding: 8,
            minHeight: 'calc(100vh - 16px)',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

const ProtectedRoute = () => {
  return (
    <AuthProvider>
      <ProtectedLayout>
        <Outlet />
      </ProtectedLayout>
    </AuthProvider>
  );
};

const PublicRoute = () => {};

export const router = createBrowserRouter(
  [
    {
      element: <ProtectedRoute />,
      children: [
        { path: '/', index: true, element: <Home /> },
        { path: '/profile-settings', element: <ProfileSettings /> },
      ],
    },
    { path: '/login', element: <>login</> },
  ],
  { basename: '/house-work-mini-app' }
);
