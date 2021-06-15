'use strict';


const Controller = require('../core/base_controller');

class LogsController extends Controller {

  async create() {
    const ctx = this.ctx;
    const body = ctx.request.body;

    const logs = Object.assign({}, {
      elapsed: body.elapsed, ok: body.ok, method: body.method, status: body.status,
      url: body.url, body: body.body, result: body.result, errorMessage: body.errorMessage,
      loginName: body.loginName, companyId: body.companyId,
      host: body.host, explore: body.explore, os: body.os, createTime: new Date(),
    });

    const addResult = await this.app.elasticsearch.bulk({
      body: [
        { index: { _index: 'zc-test-logs' } },
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
    const query = this.ctx.query;
    const page = query.page || 1;
    const size = query.size || 10;

    let searchQuery = { match_all: {} };
    if (query.keyword) {
      searchQuery = { query_string: { query: query.keyword } };
      // searchQuery = { query_string: query.keyword };
    }

    const result = await this.app.elasticsearch.search({
      index: 'zc-test-logs',
      from: (page - 1) * size,
      size,
      // _source: ['url', 'loginName', 'method', 'status', 'ok', 'host', 'explore', 'os', 'createTime'],
      body: {
        query: searchQuery,
        sort: [{ createTime: 'desc' }],
      },
    });
    // console.log('queryResult: ', JSON.stringify(result));
    this.ctx.body = {
      page: {
        totalElements: result.hits.total.value, number: page, size,
        totalPages: Math.ceil(result.hits.total.value / size),
      },
      content: result.hits.hits.map(m => Object.assign({ index: m._id }, m._source)),
    };
  }

}

module.exports = LogsController;
