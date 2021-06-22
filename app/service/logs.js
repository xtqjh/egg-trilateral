'use strict';

const Service = require('../core/base_service');

class LogsService extends Service {

  async list(data) {
    const page = data.page || this.config.page.page;
    const size = data.size || this.config.page.size;
    let searchQuery = { match_all: {} };
    let sortQuery = [{ createTime: 'desc' }];
    // const keyword = { query_string: { query: data.keyword } };
    const keyword = [{ match_phrase: { body: { query: data.keyword } } }, { match_phrase: { url: { query: data.keyword } } }];
    if (data.keyword) { searchQuery = keyword; }
    if (data.loginName || data.companyId) {
      const musts = [];
      if (data.loginName) { musts.push({ match: { loginName: data.loginName } }); }
      if (data.companyId) { musts.push({ match: { companyId: data.companyId } }); }
      searchQuery = {
        bool: {
          must: musts,
          should: data.keyword && keyword || [],
          minimum_should_match: 1,
        },
      };
    }
    if (data.sort && Array.isArray(data.sort)) {
      const obj = {};
      obj[data.sort[0]] = data.sort[1];
      sortQuery = [obj];
    }

    const result = await this.app.elasticsearch.search({
      index: data.indexName || 'ylzx-logs',
      from: (page - 1) * size,
      size,
      // _source: ['url', 'loginName', 'method', 'status', 'ok', 'host', 'explore', 'os', 'createTime'],
      body: {
        query: searchQuery,
        sort: sortQuery,
      },
    });
    return result;
  }


}

module.exports = LogsService;
