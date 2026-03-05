import { FallbackProps } from 'react-error-boundary';

import styles from './index.module.scss';

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : '未知错误';
  const errorStack = error instanceof Error ? error.stack : '';

  return (
    <div role="alert" className={styles.container}>
      <h3>😵 页面出错了！</h3>
      <p>
        <strong>错误信息：</strong>
        {errorMessage}
      </p>
      <pre className={styles.code}>{errorStack}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
}
