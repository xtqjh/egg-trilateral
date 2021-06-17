'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg zhangzhao';
  }

  async home() {
    const { ctx } = this;
    // console.log('访问者', ctx.request);
    ctx.body = '您好 访问者 欢迎您';
  }
}

module.exports = HomeController;
