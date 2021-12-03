'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/monitor', controller.monitor.list);
  router.get('/api/monitor/report', controller.monitor.create);
  router.post('/api/monitor/report', controller.monitor.create);
};
