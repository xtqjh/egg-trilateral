'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/took', controller.took.list);
  router.post('/took/import', controller.took.import);
};
