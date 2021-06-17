'use strict';

const Service = require('../core/base_service');

class ClientsService extends Service {

  async list(data = { page: 1, size: Number }) {
    const { size } = this.config.page;
    let where = '';
    if (data.search_value) {
      where = ` WHERE ${data.search_key} Like '%${data.search_value}%'`;
    }
    const sql_count = `SELECT COUNT(*) FROM clients ${where};`;
    const sql_where = `SELECT * FROM clients ${where} ORDER BY create_time DESC LIMIT ${(data.page - 1) * (data.size || size)},${data.size || size};`;
    // console.log(sql_count, sql_where, data, size);
    const client = this.app.mysql.get('notes');
    const result = await client.query(sql_count + sql_where, []);
    return this.success({
      size: data.size || size,
      totalElements: result[0][0]['COUNT(*)'],
      totalPages: Math.ceil(parseInt(result[0][0]['COUNT(*)']) / (data.size || size)),
      content: result[1],
    });
  }

  async listOverall(data = { page: 1, size: Number }) {
    const { size } = this.config.page;
    let where = '';
    if (data.search_value) {
      where = ` WHERE ${data.search_key} Like '%${data.search_value}%'`;
    }
    const sql_where = `select c.cid,c.name,a.aid,a.address,t.tid,t.votes,t.pieces from clients c left join clients_address a on c.cid = a.cid left join clients_took t on t.aid = a.aid ${where} LIMIT ${(data.page - 1) * (data.size || size)},${data.size || size};`;
    const client = this.app.mysql.get('notes');
    const result = await client.query(sql_where, []);
    return this.success({
      content: result,
    });
  }

}

module.exports = ClientsService;
