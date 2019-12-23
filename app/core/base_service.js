'use strict';

const Service = require('egg').Service;

class BaseService extends Service {

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
}
module.exports = BaseService;

