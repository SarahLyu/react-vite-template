import { useNavigate } from 'react-router';

import styles from './index.module.scss';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles['not-found']}>
      <div className={styles['not-found-content']}>
        <h1 className={styles['not-found-code']}>404</h1>
        <h2 className={styles['not-found-title']}>页面未找到</h2>
        <p className={styles['not-found-desc']}>你访问的地址不存在或已被移除，请返回首页继续浏览</p>
        <button onClick={() => navigate('/')}>回到首页</button>
      </div>
    </div>
  );
}
