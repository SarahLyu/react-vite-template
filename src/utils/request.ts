import axios from 'axios';

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 3000,
});

type AxiosResponseStatus = 400 | 401 | 403 | 429 | 500 | 'ECONNABORTED';

const axiosExceptionHandler: Record<AxiosResponseStatus | 'default', (ctx: any) => void> = {
  400: (ctx) => {
    console.error(400, ctx?.data?.message || '请求参数错误');
  },

  401: (ctx) => {
    window.postMessage('AUTH:LOGOUT');
    console.error(401, ctx?.data?.message || '登录已过期，请重新登录');
  },

  403: (ctx) => {
    console.error('403', ctx?.data?.message || '无权限访问，请联系管理员');
  },

  429: (ctx) => {
    console.error(429, ctx?.data?.message || '请求过于频繁，请稍后重试');
  },

  500: (ctx) => {
    console.error(500, ctx?.data?.message || '服务器内部错误');
  },

  ECONNABORTED: (ctx) => {
    console.warn('time out', ctx?.data?.message || '请求超时，请检查网络');
  },

  default: (ctx) => {
    console.error('unknown exception', ctx?.data?.message || '未知错误');
  },
};

request.interceptors.request.use((config) => config);

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;

    // Unified exception interception
    const status: AxiosResponseStatus = response?.status;
    const handler = axiosExceptionHandler[status] ?? axiosExceptionHandler.default;

    handler(response);

    return Promise.reject(error);
  }
);
