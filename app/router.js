'use strict';

module.exports = app => {

  const { router, controller } = app;
  router.get('/', controller.home.home);
  router.get('/search', controller.search.index);
  router.resources('logs', '/logs', controller.logs);

  require('./router/took')(app);
  require('./router/clients')(app);


};
