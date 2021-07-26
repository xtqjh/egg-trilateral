'use strict';

const Service = require('../core/base_service');

class LogsService extends Service {

  async list(data) {
    const page = data.page || this.config.page.page;
    const size = data.size || this.config.page.size;
    let searchQuery = { match_all: {} };
    let sortQuery = [{ createTime: 'desc' }];
    // const keyword = { query_string: { query: data.keyword } };
    const keyword = [
      { match_phrase: { body: { query: data.keyword } } },
      { match_phrase: { url: { query: data.keyword } } },
      { match_phrase: { title: { query: data.keyword } } },
      { match_phrase: { result: { query: data.keyword } } },
    ];
    if (data.keyword) { searchQuery = keyword; }
    if (data.loginName || data.companyId || (data.startTime && data.endTime) || data.client || data.key || data.sid || data.tid) {
      const musts = [];
      if (data.loginName) { musts.push({ match: { loginName: data.loginName } }); }
      if (data.companyId) { musts.push({ match: { companyId: data.companyId } }); }
      if (data.startTime && data.endTime) { musts.push({ range: { createTime: { from: data.startTime, to: data.endTime } } }); }
      if (data.client) { musts.push({ match: { client: data.client } }); }
      if (data.key) { musts.push({ match: { key: data.key } }); }
      if (data.sid) { musts.push({ match: { sid: data.sid } }); }
      if (data.tid) { musts.push({ match: { tid: data.tid } }); }
      searchQuery = {
        bool: {
          must: musts,
          should: data.keyword && keyword || [],
          minimum_should_match: data.keyword && 1 || 0,
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
        track_total_hits: true,
        query: searchQuery,
        sort: sortQuery,
      },
    });
    return result;
  }


}

module.exports = LogsService;
