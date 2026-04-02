import 'react';

declare module 'react' {
  interface CSSProperties {
    // 允许所有以 -- 开头的 CSS 变量
    [key: `--${string}`]: string | number | undefined;
  }
}
