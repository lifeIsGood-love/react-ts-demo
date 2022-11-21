import axios from 'axios';
import qs from 'qs';
import {
  jdBaseURL
} from "./APIConfig";

const axiosInstance = axios.create({
  timeout: 5000,
  withCredentials: true,
  baseURL: jdBaseURL
});



/*
 *请求响应拦截
 *用于处理数据返回后的操作
 */
axiosInstance.interceptors.response.use(response => {
  // const {
  //   code
  // } = response.data;
  // if (code && code === '0') {
  //   return Promise.resolve(response.data);
  // }
  // return Promise.reject({});
  if (typeof response.data === 'object') {
    return Promise.resolve(response.data)
  } else if (response.data && typeof response.data === 'string'){
    try {
      let obj = JSON.parse(response.data)
      return Promise.resolve(obj)
    } catch(error) {
      return Promise.reject(error);
    }
  }
  return Promise.resolve({});
}, error => {
  return Promise.reject(error);
})

/*
 *get方法，对应get请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function get(url, params, config) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, {
        params,
        ...config
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/*
 *post方法，对应post请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function post(url, params, config) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, params, {
        ...config
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/*
 *post方法，对应post请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function postForm(url, params, config) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(
        url,
        qs.stringify(params), {
          ...config,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
