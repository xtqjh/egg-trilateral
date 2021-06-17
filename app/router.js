'use strict';

module.exports = app => {

  const { router, controller } = app;
  router.get('/', controller.home.home);
  router.get('/logs', controller.elasticsearch.esList);
  router.get('/logs/:name', controller.elasticsearch.esDetails);

  router.resources('logs', '/api/logs', controller.logs);

  require('./router/took')(app);
  require('./router/clients')(app);


};
