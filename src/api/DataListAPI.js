import Server from "./BaseServer";
// import getUuid from '@jmdd/jmdd-get-uuid'

class FeedsAPI extends Server {
  async getRDCData(param, uuidstr) {
    return this.axios("post", "/getCustomizeFeedsList", {
      params: {
        appid: "contenth5_common",
        functionId: "getCustomizeFeedsList",
        body: JSON.stringify(param),
        client: 'wh5',
        partner: 'ace1033463nrjs',
        uuid: uuidstr || '',
      },
    });
  }
   // 内容浏览任务查询
   getFeedsTask = (projectIdStr, assignmentIdStr) => this.axios('post', '/interactive_info', {
    params: {
      functionId: 'interactive_info',
      appid: 'contenth5_common',
      body: JSON.stringify([{
        type: '18', // 浏览任务
        projectId: projectIdStr, // 项目id
        assignmentId: assignmentIdStr, // 任务id
      }]),
      client: 'wh5',
      partner: 'ace1033463nrjs',
    }
  })

  // 内容浏览任务领取任务
  doFeedsTask = (projectIdStr, assignmentIdStr, itemIdStr, contentTypeStr) => this.axios('post', '/interactive_accept', {
    params: {
      functionId: 'interactive_accept',
      appid: 'contenth5_common',
      body: {
        projectId: projectIdStr, // 项目id
        assignmentId: assignmentIdStr, // 任务id
        type: '18', // 浏览任务
        contentId: itemIdStr,
        contentType:contentTypeStr,
      },
      client: 'wh5',
      partner: 'ace1033463nrjs',
    }
  })
}

export default new FeedsAPI();
