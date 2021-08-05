'use strict';


const Controller = require('../core/base_controller');

class TransOrderController extends Controller {

  async index() {
    this.ctx.validate({
      page: { type: 'int', required: false, range: { min: 1 }, desc: '当前页数' },
      size: { type: 'int', required: false, range: { min: 10, max: 500 }, desc: '每页条数' },
      keyword: { type: 'string', required: false, trim: true, desc: '搜索关键字' },
      status: { type: 'array', required: false, desc: '状态' },
      startTime: { type: 'date', required: false, desc: '记录开始时间' },
      endTime: { type: 'date', required: false, desc: '记录结束时间' },
    });

    const data = this.ctx.query;
    const page = data.page || this.config.page.page;
    const size = data.size || this.config.page.size;
    let searchQuery = { match_all: {} };
    const keyword = { query_string: { query: data.keyword } };
    if (data.keyword) { searchQuery = keyword; }
    if ((data.startTime && data.endTime) || (data.status && Array.isArray(data.status))) {
      const musts = [];
      if (data.startTime && data.endTime) {
        musts.push({ range: { createTime: { gte: new Date(data.startTime).getTime(), lte: new Date(data.endTime).getTime() } } });
        // musts.push({ range: { createTime: { from: new Date(data.startTime).getTime(), to: new Date(data.endTime).getTime() } } });
      }
      if (data.status && Array.isArray(data.status)) {
        musts.push({ terms: { status: data.status } });
      }
      searchQuery = {
        bool: {
          must: musts,
          should: data.keyword && keyword || [],
          minimum_should_match: data.keyword && 1 || 0,
        },
      };
    }

    const result = await this.app.es.search({
      index: 'ylzxtransorderv4',
      from: (page - 1) * size,
      size,
      _source: ['receiveAddress', 'receiveLocation', 'receiveName', 'sendAddress', 'sendLocation', 'sendName', 'status', 'statusDesc', 'createTime', 'volume', 'weight', 'transOrderCode'],
      body: {
        // track_total_hits: true,
        query: searchQuery,
      },
    });

    this.ctx.body = {
      page: {
        totalElements: result.hits.total, number: this.ctx.query.page || this.config.page.page,
        size: this.ctx.query.size || this.config.page.size,
        totalPages: Math.ceil(result.hits.total / (this.ctx.query.size || this.config.page.size)),
      },
      content: result.hits.hits.map(m => Object.assign({ index: m._id }, m._source)),
    };
  }

}

module.exports = TransOrderController;
