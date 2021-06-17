'use strict';


const Controller = require('./logs');

class SearchController extends Controller {

  async esList() {
    const result = await this.app.elasticsearch.cat.indices({ format: 'json' });
    await this.ctx.render('logger/list.tpl', { list: result });
  }

  async esDetails() {
    console.log(this.ctx.params, this.ctx.query);
    const query = Object.assign(this.ctx.query, { indexName: this.ctx.params.name });

    this.ctx.validate({
      page: { type: 'int', range: { min: 1 }, desc: '当前页数' },
      size: { type: 'int', range: { min: 10, max: 100 }, desc: '每页条数' },
      keyword: { type: 'string', trim: true, desc: '搜索关键字' },
      loginName: { type: 'string', desc: '用户名称' },
      companyId: { type: 'string', desc: '组织机构ID' },
    });

    let result = await this.service.logs.list(query);
    result = {
      page: {
        totalElements: result.hits.total.value, number: this.ctx.query.page || this.config.page.page,
        size: this.ctx.query.size || this.config.page.size,
        totalPages: Math.ceil(result.hits.total.value / (this.ctx.query.size || this.config.page.size)),
      },
      content: result.hits.hits.map(m => Object.assign({ index: m._id }, m._source)),
    };
    await this.ctx.render('logger/detail.tpl', { result });
  }

}

module.exports = SearchController;
