'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/api/logs/count', controller.logs.count);

};
