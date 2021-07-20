'use strict';

module.exports = app => {

  const { router, controller } = app;
  router.get('/', controller.home.home);
  router.get('/logs', controller.elasticsearch.esList);
  router.get('/logs/:name', controller.elasticsearch.esDetails);

  router.resources('logs', '/api/logs', controller.logs);
  router.resources('error', '/api/error', controller.error);
  router.resources('transorder', '/api/transorder', controller.transorder);
  router.resources('order', '/api/order', controller.order);

  require('./router/took')(app);
  require('./router/clients')(app);

  require('./router/track')(app);
  require('./router/simple')(app);


};
