'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/monitor/report', controller.monitor.create);
  router.post('/monitor/report', controller.monitor.create);
};
