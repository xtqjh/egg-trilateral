'use strict';

const Service = require('../core/base_service');

class TookService extends Service {

  async list(data = { page: 1, size: Number }) {
    const { size } = this.config.page;
    let where = '';
    if (data.search_value) {
      where = ` WHERE ${data.search_key} Like '%${data.search_value}%'`;
    }
    const sql_count = `SELECT COUNT(*) FROM zc_took ${where};`;
    const sql_where = `SELECT * FROM zc_took ${where} ORDER BY create_time DESC LIMIT ${(data.page - 1) * (data.size || size)},${data.size || size};`;
    console.log(sql_count, sql_where, data, size);
    const client = this.app.mysql.get('notes');
    const result = await client.query(sql_count + sql_where, []);
    return this.success({
      size: data.size || size,
      totalElements: result[0][0]['COUNT(*)'],
      totalPages: Math.ceil(parseInt(result[0][0]['COUNT(*)']) / (data.size || size)),
      content: result[1],
    });
  }

  async add(data) {
    const sql = 'INSERT INTO zc_took(province,city,area,address,party_B_name,party_A_name,votes,pieces,create_time,punctuate_color) VALUES ? ';
    const client = this.app.mysql.get('notes');
    const result = await client.query(sql, [data]);
    return this.success(result);
  }

}

module.exports = TookService;
