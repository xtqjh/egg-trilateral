'use strict';


const Controller = require('../core/base_controller');

class TookController extends Controller {

  async list() {
    const { ctx, service, logger } = this;
    const page = ctx.query.page || 1;
    logger.info('输入', ctx.query);
    const result = await service.took.list({ page, size: Number(ctx.query.size), search_key: ctx.query.search_key, search_value: ctx.query.search_value });
    logger.info('输出', result);
    if (result.code === 1) {
      ctx.body = this.fail(result.content);
    } else {
      ctx.body = this.success(result.content);
    }
  }


  /**
   * post
   */
  async import() {
    const { ctx, service, logger } = this;
    const body = ctx.request.body;
    logger.info('输入', body);
    let data = body.slice();
    data = data.map(v => {
      return [
        v.province,
        v.city,
        v.area,
        v.address,
        v.party_B_name,
        v.party_A_name,
        v.votes,
        v.pieces,
        v.create_time,
      ];
    });
    const result = await service.took.add(data);
    logger.info('输出', result);
    if (result.code === 1) {
      ctx.body = this.fail(result.content);
    } else {
      ctx.body = this.success(result.content);
    }
  }

}

module.exports = TookController;
