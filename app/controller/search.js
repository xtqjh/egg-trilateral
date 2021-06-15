'use strict';


const Controller = require('../core/base_controller');

class SearchController extends Controller {

  async index() {
    // 测试的时候，逐个代码展开测试 如下：

    // 增加数据
    // await this.add();

    // 修改数据
    // await this.edit();

    // 搜索数据
    await this.query();

    // 分页搜索数据
    // await this.pager();

    // 统计数据
    // await this.count();

    // 删除数据
    // await this.delete();
  }

  async add() {
    const addResult = await this.app.elasticsearch.bulk({
      body: [
        { index: { _index: 'news', _id: '44444' } },
        { content: '使用ARM芯片的Mac将可能在2020年推出666打飞机阿里肯德基罚款违法', kaka: '23842981111' },
      ],
    });
    console.log('add: ', addResult);
    this.ctx.body = addResult;
  }

  async edit() {
    const editResult = await this.app.elasticsearch.bulk({
      body: [
        { update: { _index: 'news', _id: '111111111111111111' } },
        { doc: { content: '使用ARM芯片的Mac将可能在2020年推出666' } },
      ],
    });
    console.log('editResult: ', editResult);
    this.ctx.body = 'update test';
  }

  async query() {
    const result = await this.app.elasticsearch.search({
      index: 'news',
      body: {
        query: {
          match_all: { },
        },
      },
    });
    console.log('queryResult: ', JSON.stringify(result));
    this.ctx.body = JSON.stringify(result);
  }

  async pager() {
    const page = 1;
    const pageSize = 2;
    const result = await this.app.elasticsearch.search({
      index: 'news',
      from: (page - 1) * pageSize,
      size: pageSize,
      body: {
        query: {
          match: {
            content: '666',
          },
        },
      },
    });
    console.log('pagerResult: ', JSON.stringify(result));
    this.ctx.body = JSON.stringify(result);
  }

  async count() {
    const result = await this.app.elasticsearch.count({
      index: 'news',
      type: 'doc',
      body: {
        query: {
          match: {
            content: '666',
          },
        },
      },
    });

    console.log(result);
    this.ctx.body = 'count test';
  }

  async delete() {
    const result = await this.app.elasticsearch.bulk({
      body: [
        { delete: { _index: 'news', _id: '111111111111111111' } },
      ],
    });
    console.log('deleteResult: ', result);
    this.ctx.body = 'delete test';
  }

}

module.exports = SearchController;
