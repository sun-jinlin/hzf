// 引入axios
import axios from 'axios'

// 引入antd-mobile
import { Toast } from 'antd-mobile';

// 基础路径
const BASE_URL = 'http://api-haoke-dev.itheima.net'

// 创建axios实例
const MyAxios = axios.create(
  {
    baseURL: BASE_URL
  }
)
// 请求拦截器
MyAxios.interceptors.request.use(function (config) {
  Toast.loading('加载中...');
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 响应拦截器
MyAxios.interceptors.response.use(function (response) {
  Toast.hide()
  const { data: { status, description, body } } = response
  return {
    status,
    description,
    data: body
  };
}, function (error) {
  return Promise.reject(error);
});

export { BASE_URL }

export default MyAxios