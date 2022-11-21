import {
  get,
} from "./server";
// 头部达人信息
export const getTalentHeadInfo = (data) => get('', {
  functionId: "talent_head_findTalentMsg",
  body: JSON.stringify(data),
  appid: 'dr_detail',
  client: 'H5',
})
// Tab
export const getDynamicTab = (data) => get('', {
  functionId: "jdTalentPageDynamicTab",
  body: JSON.stringify(data),
  appid: 'dr_detail',
  client: 'H5',
})
// 种草秀list
export const getShowList = (data) => get('', {
  functionId: "talent_aha_findUserAhaList",
  body: JSON.stringify(data),
  appid: 'dr_detail',
  client: 'H5',
})
// 图文 视频 直播
export const getContentList = (data) => get('', {
  functionId: "jdTalentContentList",
  body: JSON.stringify(data),
  appid: 'dr_detail',
  client: 'H5',
})

// 提问list
export const getQuestionList = (data) => get('', {
  functionId: "findUserQuestionList",
  body: JSON.stringify(data),
  appid: 'dr_detail',
  client: 'H5',
})

// 回答list
export const getAnsweredList = (data) => get('', {
  functionId: "findUserAnsweredList",
  body: JSON.stringify(data),
  appid: 'dr_detail',
  client: 'H5',
})
