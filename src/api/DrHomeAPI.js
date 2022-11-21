import Server from '@/api/BaseServer';

class DrHomeAPI extends Server {

  getVideoContentList = (reqData) => this.axios('post', '/video_videoDetail', {
    params: {
      functionId: 'video_videoDetail',
      appid: 'dr_detail',
      body: JSON.stringify(reqData),
      client: 'wh5',
    },
  });
}

export default new DrHomeAPI()
