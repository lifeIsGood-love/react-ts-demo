import axios from 'axios';
import { jdBaseURL } from '@/api/APIConfig';

// axios不支持jsonp请求,需要自己封装
axios.jsonp = (_url, options = {}) => {
  const generateCallbackFunction = () => (`jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`);

  const clearFunction = (functionName) => {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  };

  const removeScript = (scriptId) => {
    const script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  };

  // to avoid param reassign
  let url = _url;
  const defaultOptions = {
    timeout: 10000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null,
  };
  const timeout = options.timeout || defaultOptions.timeout;
  const jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

  let timeoutId;

  return new Promise((resolve, reject) => {
    const callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
    const scriptId = `${jsonpCallback}_${callbackFunction}`;

    window[callbackFunction] = (response) => {
      resolve(response);

      if (timeoutId) clearTimeout(timeoutId);

      removeScript(scriptId);

      clearFunction(callbackFunction);
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    url += url.indexOf('?') === -1 ? '?' : '&';
    Object.entries(options).forEach((item) => {
      url += item[0] + '=' + encodeURIComponent(item[1]) + '&';
    });
    const jsonpScript = document.createElement('script');
    jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`);
    if (options.charset) {
      jsonpScript.setAttribute('charset', options.charset);
    }
    jsonpScript.id = scriptId;
    document.getElementsByTagName('head')[0].appendChild(jsonpScript);

    timeoutId = setTimeout(() => {
      reject(new Error(`JSONP request to ${_url} timed out`));

      clearFunction(callbackFunction);
      removeScript(scriptId);
      window[callbackFunction] = () => {
        clearFunction(callbackFunction);
      };
    }, timeout);

    // Caught if got 404/500
    jsonpScript.onerror = () => {
      reject(new Error(`JSONP request to ${_url} failed`));

      clearFunction(callbackFunction);
      removeScript(scriptId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  });
};

/**
 * 主要options参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://test.jd.com/1.0
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params data   {object}  post方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：options中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在options中带入
 */

export default class Server {
  axios(method, url, params = {}, baseURL) {
    return new Promise((resolve, reject) => {
      if (typeof params !== 'object') params = {};
      let _option = params;
      let _base = jdBaseURL;
      if (baseURL) {
        _base = baseURL;
      }

      _option = {
        method,
        url,
        baseURL: _base,
        timeout: 15000,
        params: method.toLowerCase() === 'get' ? params : _option.params,
        data: null,
        headers: null,
        withCredentials: true, // 是否携带cookies发起请求
        validateStatus: (status) => (status >= 200 && status < 300),
        ...params,
      };

      _option.headers = _option.headers || {};

      if (method.toLowerCase() === 'jsonp') {
        if (url.indexOf('//') === -1) {
          url = _option.baseURL + url;
        }
        axios
          .jsonp(url, params)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        axios.request(_option).then(
          (res) => {
            resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data));
          },
          (error) => {
            if (error.response) {
              reject(error.response.data);
            } else {
              reject(error);
            }
          }
        );
      }
    });
  }
}
