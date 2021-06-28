'use strict';


const Controller = require('../core/base_controller');

class ErrorController extends Controller {

  async create() {
    const ctx = this.ctx;

    ctx.validate({
      indexName: { type: 'string', required: true, desc: '索引名称' },
      host: { type: 'string', desc: '域名' },
      explore: { type: 'string', desc: '浏览器' },
      os: { type: 'string', desc: '操作系统' },
      url: { type: 'string', desc: '页面地址' },
      title: { type: 'all', desc: '标题' },
      html: { type: 'all', desc: '页面' },
      image: { type: 'all', desc: '页面图像' },
      errMessage: { type: 'all', desc: '错误信息' },
    });

    const body = ctx.request.body;

    const addResult = await this.app.elasticsearch.index({
      index: body.indexName || 'ylzx-error',
      type: '_doc',
      body: { createTime: new Date(), host: body.host, explore: body.explore, os: body.os, url: body.url, errMessage: body.errMessage, title: body.title },
    }).then(
      res => this.app.elasticsearch.index({
        index: 'error-html',
        type: '_doc',
        id: res._id,
        body: { createTime: new Date(), html: body.html, image: body.image },
      })
    );
    console.log('b', addResult);
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
      sort: { type: 'array', required: false, trim: true, desc: '排序' },
      startTime: { type: 'date', required: false, desc: '记录开始时间' },
      endTime: { type: 'date', required: false, desc: '记录结束时间' },
    });

    const result = await this.service.logs.list(this.ctx.query);
    this.ctx.body = {
      page: {
        totalElements: result.hits.total.value, number: this.ctx.query.page || this.config.page.page,
        size: this.ctx.query.size || this.config.page.size,
        totalPages: Math.ceil(result.hits.total.value / (this.ctx.query.size || this.config.page.size)),
      },
      content: result.hits.hits.map(m => Object.assign({ index: m._id }, m._source)),
    };
  }

  async show() {
    const result = await this.app.elasticsearch.get({
      id: this.ctx.params.id,
      index: this.ctx.query.indexName,
    });
    this.ctx.body = result._source;
  }

}

module.exports = ErrorController;
