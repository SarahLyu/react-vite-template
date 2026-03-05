import { request } from '@/utils/request';

export const login = (data: any) =>
  request('/login', {
    method: 'POST',
    data,
  });

export const logout = () =>
  request('/logout', {
    method: 'POST',
  });

export const fetchUserInfo = () =>
  request('/user', {
    method: 'GET',
  });
