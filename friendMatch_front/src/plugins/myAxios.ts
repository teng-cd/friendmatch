// 创建实例时配置默认值
import axios,{type AxiosInstance}from "axios";
const isDev = process.env.NODE_ENV === 'development';

const myAxios: AxiosInstance = axios.create({
    baseURL: isDev ? 'http://localhost:8081' : '线上地址',
});
myAxios.defaults.withCredentials = true; //配置为true
// 添加请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log("我要发请求啦", config);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    console.log("我收到请求啦", response);
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response?.data?.code===40100){
      const redirectUrl=window.location.href;
      window.location.href=`/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default myAxios;
