/* eslint-disable  import/no-mutable-exports */
// 接口环境
let jdBaseURL;
// server判断是否是预发环境
const server = window.location.host.indexOf('beta') > -1;

const betaPrdAPI = window.location.href.indexOf('usePrdApi=true') > -1

if (server || process.env.NODE_ENV === 'development') {
  // jdBaseURL = '//beta-api.m.jd.com/client.action';
  jdBaseURL ='//api.m.jd.com/client.action';
  if (betaPrdAPI) {
    jdBaseURL = '//api.m.jd.com/client.action';
  }
} else {
  jdBaseURL = '//api.m.jd.com/client.action';
}

export {
  jdBaseURL
};