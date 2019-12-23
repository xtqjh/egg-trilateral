'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg zhangzhao';
  }

  async home() {
    const { ctx } = this;
    console.log('访问者', ctx.request);
    ctx.body = '你好 访问者 zhangzhao';
  }
}

module.exports = HomeController;
