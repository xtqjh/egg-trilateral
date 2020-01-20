'use strict';


const Controller = require('../core/base_controller');

class ClientsController extends Controller {

  /**
   * 简易模式
   */
  async list() {
    const { ctx, service, logger } = this;
    const page = ctx.query.page || 1;
    logger.info('输入', ctx.query);
    const result = await service.clients.list({ page, size: Number(ctx.query.size), search_key: ctx.query.search_key, search_value: ctx.query.search_value });
    logger.info('输出', result);
    if (result.code === 1) {
      ctx.body = this.fail(result.content);
    } else {
      ctx.body = this.success(result.content);
    }
  }

  /**
   * 全面模式
   */
  async listOverall() {
    const { ctx, service, logger } = this;
    const page = ctx.query.page || 1;
    logger.info('输入', ctx.query);
    const result = await service.clients.listOverall({ page, size: Number(ctx.query.size), search_key: ctx.query.search_key, search_value: ctx.query.search_value });
    logger.info('输出', result);
    if (result.code === 1) {
      ctx.body = this.fail(result.content);
    } else {
      ctx.body = this.success(result.content);
    }
  }



}

module.exports = ClientsController;
