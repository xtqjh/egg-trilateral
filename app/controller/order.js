'use strict';

const Controller = require('../core/base_controller');

class OrderController extends Controller {

  async index() {
    this.ctx.body = 'result.rows';
  }

}

module.exports = OrderController;
