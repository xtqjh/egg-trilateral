'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/clients', controller.clients.list);
  router.get('/clients/overall', controller.clients.listOverall);
};
