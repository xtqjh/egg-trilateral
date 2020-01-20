'use strict';

module.exports = app => {

  const { router, controller } = app;
  router.get('/', controller.home.home);

  require('./router/took')(app);
  require('./router/clients')(app);


};
