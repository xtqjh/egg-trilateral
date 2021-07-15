'use strict';

module.exports = app => {
  require('./app/extent/elasticsearch')(app);
};
