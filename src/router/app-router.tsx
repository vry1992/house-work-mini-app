import { Outlet, createBrowserRouter } from 'react-router';
import { AuthProvider } from '../features/auth/providers/AuthProvider';

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
