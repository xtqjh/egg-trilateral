'use strict';


const Controller = require('../core/base_controller');

class MonitorController extends Controller {

  async create() {
    const { ctx, logger } = this;

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

    // logger.info(ctx);
    // logger.info('输入query:', ctx.query);
    // logger.info('输入body:', ctx.request.body);

    let body = null;
    if (ctx.request.method == 'GET') { body = ctx.query; }
    if (ctx.request.method == 'POST') { body = ctx.request.body; }

    // logger.info('组合body:', body);

    const logs = Object.assign(body, { reportType: ctx.request.method, createTime: new Date() });

    // logger.info('组合logs:', logs);

    const addResult = await this.app.elasticsearch.bulk({
      body: [
        { index: { _index: logs.appid || 'ylzx-monitor' } },
        logs,
      ],
    });
    if (addResult.errors) {
      ctx.body = this.fail('fail');
    } else {
      ctx.body = this.success('success');
    }
  }

  async list() {

    this.ctx.validate({
      appid: { type: 'string', required: true, desc: 'appid' },
      page: { type: 'int', required: false, range: { min: 1 }, desc: '当前页数' },
      size: { type: 'int', required: false, range: { min: 10, max: 500 }, desc: '每页条数' },
      keyword: { type: 'string', required: false, trim: true, desc: '搜索关键字' },
      sort: { type: 'array', required: false, trim: true, desc: '排序' },
      startTime: { type: 'date', required: false, desc: '记录开始时间' },
      endTime: { type: 'date', required: false, desc: '记录结束时间' },
    });

    const logs = Object.assign(this.ctx.query, { indexName: this.ctx.query.appid });
    const result = await this.service.logs.list(logs);
    this.ctx.body = {
      page: {
        totalElements: result.hits.total.value, number: this.ctx.query.page || this.config.page.page,
        size: this.ctx.query.size || this.config.page.size,
        totalPages: Math.ceil(result.hits.total.value / (this.ctx.query.size || this.config.page.size)),
      },
      content: result.hits.hits.map(m => Object.assign({ index: m._id }, m._source)),
    };
  }

}

module.exports = MonitorController;
