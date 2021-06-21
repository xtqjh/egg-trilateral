'use strict';


const Controller = require('../core/base_controller');

class LogsController extends Controller {

  async create() {
    const ctx = this.ctx;

    ctx.validate({
      indexName: { type: 'string', required: true, desc: '索引名称' },
      elapsed: { type: 'int', desc: '操作时长（毫秒）' },
      ok: { type: 'boolean', desc: '操作结果' },
      method: { type: 'string', range: { in: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'CLICK'] }, desc: '类型' },
      loginName: { type: 'string', desc: '用户名称' },
      companyId: { type: 'string', desc: '组织机构ID' },
      host: { type: 'string', desc: '域名' },
      explore: { type: 'string', desc: '浏览器' },
      os: { type: 'string', desc: '操作系统' },
      url: { type: 'string', desc: '请求地址' },
      status: { type: 'int', desc: '请求返回状态码' },
      body: { type: 'all', desc: '参数' },
      result: { type: 'all', desc: '返回' },
      errMessage: { type: 'all', desc: '错误信息' },
    });

    const body = ctx.request.body;

    // console.log(body);

    const logs = Object.assign({}, {
      elapsed: body.elapsed, ok: body.ok, method: body.method, status: body.status,
      url: body.url, body: body.body, result: body.result, errMessage: body.errMessage,
      loginName: body.loginName, companyId: body.companyId,
      host: body.host, explore: body.explore, os: body.os, createTime: new Date(),
    });

    const addResult = await this.app.elasticsearch.bulk({
      body: [
        { index: { _index: body.indexName || 'ylzx-logs' } },
        logs,
      ],
    });
    if (addResult.errors) {
      ctx.body = this.fail('fail');
    } else {
      ctx.body = this.success('success');
    }
  }

  async index() {

    this.ctx.validate({
      indexName: { type: 'string', required: true, desc: '索引名称' },
      page: { type: 'int', required: false, range: { min: 1 }, desc: '当前页数' },
      size: { type: 'int', required: false, range: { min: 10, max: 500 }, desc: '每页条数' },
      keyword: { type: 'string', required: false, trim: true, desc: '搜索关键字' },
      loginName: { type: 'string', required: false, desc: '用户名称' },
      companyId: { type: 'string', required: false, desc: '组织机构ID' },
    });

    const result = await this.service.logs.list(this.ctx.query);
    // console.log('queryResult: ', JSON.stringify(result));
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

module.exports = LogsController;
