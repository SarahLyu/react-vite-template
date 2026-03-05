import { useRouteError } from 'react-router';

import ErrorFallback from './components/ErrorFallback';

function ErrorPage() {
  const error = useRouteError() as any;
  console.error('路由错误：', error);

  return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />;
}

export default ErrorPage;
