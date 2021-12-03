'use strict';


const Controller = require('../core/base_controller');

class MonitorController extends Controller {

  async create() {
    const ctx = this.ctx;

    ctx.validate({
      appid: { type: 'string', required: true, desc: 'appid' },
      uuid: { type: 'string', desc: 'uuid' },
      language: { type: 'string', desc: '语言' },
      browserType: { type: 'string', desc: '浏览器类型' },
      browserVersion: { type: 'string', desc: '浏览器版本号' },
      browserEngine: { type: 'string', desc: '浏览器引擎' },
      osType: { type: 'string', desc: '操作系统' },
      osVersion: { type: 'string', desc: '操作系统版本' },
      protocol: { type: 'string', desc: '协议' },
      host: { type: 'string', desc: '域名' },
      url: { type: 'string', desc: '地址' },
      eventId: { type: 'string', desc: '事件ID' },
      eventTime: { type: 'string', desc: '事件时间' },
      eventType: { type: 'string', desc: '事件类型' },
    });

    const body = ctx.request.body;

    // console.log(body);

    const logs = Object.assign(body, { createTime: new Date() });

    const addResult = await this.app.elasticsearch.bulk({
      body: [
        { index: { _index: body.appid || 'ylzx-monitor' } },
        logs,
      ],
    });
    if (addResult.errors) {
      ctx.body = this.fail('fail');
    } else {
      ctx.body = this.success('success');
    }
  }

}

module.exports = MonitorController;
