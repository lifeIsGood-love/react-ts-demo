/**
 * @description 封装统一的 ajax 请求
 * @param {String} method  请求方式
 * @param {String} url     请求路径
 * @param {Object} requestParams  请求参数
 * @param {Object} config    配置信息，字段同https://github.com/axios/axios#request-config
 * @param {Boolean} noToast   是否需要Toast提示
 */

import axios from "axios";
import axiosRetry from 'axios-retry';
import qs from "qs";
import {
  baseURL
} from "./APIConfig";


const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
});
axiosRetry(axiosInstance, {
  retries: 1, //设置自动发送请求次数
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  },
  shouldResetTimeout: true,
  retryCondition: (error) => { //reject的error
    //true为打开自动发送请求，false为关闭自动发送请求
    return (error.config.params.functionId === "jrwInvestmentOrderReport");
  }
});

const Ajax = (
  method = "get",
  url,
  requestParams = {},
  config = {},
  noToast = false
) => {
  method = method && method.toLocaleLowerCase();
  requestParams.invoker = 'contentHelper'
  let params = {},
    data = {};
  if (method === "get" || method === "delete" || method === "jsonp") {
    params = requestParams;
  } else if (method === "post" || method === "put") {
    data = qs.stringify(requestParams, {
      arrayFormat: 'brackets'
    })
    // data = requestParams
  } else {
    throw new Error("method error");
  }
  const _option = {
    ...config,
    method,
    url,
    baseURL: baseURL,
    params,
    data,
    noToast,
  };

  return axiosInstance.request(_option);
};
// 响应拦截器
axiosInstance.interceptors.response.use(function (response) {
  const res = response.data;
  // console.log('res', res)

  if (res.success || res.subcode === '0') {
    return Promise.resolve(res);
  } else {
    checkResponseCode(res, response.config.noToast);
    return Promise.reject(res);
  }
}, function (error) {
  return Promise.reject(error);
});

// 检查错误code
const checkResponseCode = (res, noToast) => {

};

export default Ajax;
