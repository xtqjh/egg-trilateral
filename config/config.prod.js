/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {

  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1234567890_';

  // add your middleware config here
  config.middleware = [
    'gzip', 'errorHandler',
  ];

  config.errorHandler = {
    match: '/api/*',
  };

  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };

  config.page = {
    page: 1,
    size: 20,
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.elasticsearch = {
    nodeA: 'http://172.16.100.41:9200',
    nodeB: 'http://172.16.111.24:9200',
  };

  exports.valparams = {
    locale: 'zh-cn',
    throwError: true,
  };

  config.mysql = {
    clients: {
      notes: {
        connectionLimit: 5,
        waitForConnections: true,
        queueLimit: 0,
        host: '172.16.111.12',
        user: 'dev',
        password: 'PassDev123!!!',
        database: 'yjt_zc_trilateral',
        port: 3306,
        multipleStatements: true,
        useConnectionPooling: true,
      },
    },
    default: {},
    app: true,
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  return {
    ...config,
  };
};
