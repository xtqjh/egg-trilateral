'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data) {
    return {
      code: 0,
      content: data,
    };
  }

  fail(msg) {
    return {
      code: 1,
      message: msg || '',
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
