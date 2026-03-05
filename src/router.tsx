import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, useLocation, Navigate } from 'react-router';

import ErrorFallback from './components/ErrorFallback';
import NotFound from './components/NotFound';
import ErrorPage from './error-page';
import Layout from './layouts';
import Login from './pages/login';
import Public from './pages/public';
import { useAuth } from './providers/auth-provider';

const withErrorBoundary = (Component: React.ComponentType) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[Math.random()]}>
    <Component />
  </ErrorBoundary>
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    element: withErrorBoundary(Layout),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Public />,
      },
      {
        path: '/protected',
        lazy: async () => {
          const { default: Protected } = await import('./pages/protected');

          return {
            element: (
              <ProtectedRoute>
                <Protected />
              </ProtectedRoute>
            ),
          };
        },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
