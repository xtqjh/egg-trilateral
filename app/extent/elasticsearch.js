'use strict';

const elasticsearch = require('elasticsearch');

module.exports = app => {

  Object.defineProperty(app, 'es', {
    value: new elasticsearch.Client({ host: app.config.elasticsearch.nodeA }),
    writable: false,
    configurable: false,
  });

  Object.defineProperty(app, 'elasticsearch', {
    value: new elasticsearch.Client({ host: app.config.elasticsearch.nodeB }),
    writable: false,
    configurable: false,
  });

};
