'use strict';


const Controller = require('./logs');

class SearchController extends Controller {

  async error_list() {
    const result = await this.app.elasticsearch.cat.indices({ format: 'json' });
    await this.ctx.render('logger/list.tpl', { list: result });
  }

}

module.exports = SearchController;
