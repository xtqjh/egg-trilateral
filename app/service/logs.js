'use strict';

const Service = require('../core/base_service');

class LogsService extends Service {

  async list(data) {
    const page = data.page || this.config.page.page;
    const size = data.size || this.config.page.size;
    let searchQuery = { match_all: {} };
    const keyword = { query_string: { query: data.keyword } };
    if (data.keyword) { searchQuery = keyword; }
    if (data.loginName || data.companyId) {
      searchQuery = {
        bool: {
          must: [
            { match: data.loginName && { loginName: data.loginName } || {} },
            { match: data.companyId && { companyId: data.companyId } || {} },
          ],
          filter: data.keyword && keyword || {},
        },
      };
    }

    const result = await this.app.elasticsearch.search({
      index: data.indexName || 'ylzx-logs',
      from: (page - 1) * size,
      size,
      // _source: ['url', 'loginName', 'method', 'status', 'ok', 'host', 'explore', 'os', 'createTime'],
      body: {
        query: searchQuery,
        sort: [{ createTime: 'desc' }],
      },
    });
    return result;
  }


}

module.exports = LogsService;
