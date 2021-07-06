'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/simple/page/error', controller.simple.error_list);
};
