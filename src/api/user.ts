import request from './request';

export const getUserInfo = () => {
  return request({
    url: '/user',
    method: 'get',
  });
}; 