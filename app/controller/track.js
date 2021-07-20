'use strict';

const Controller = require('../core/base_controller');

const mapTrackService = 'ylzx-amap-track-service';
const mapTrackTerminal = 'ylzx-amap-track-terminal';
const mapTrackTrace = 'ylzx-amap-track-trace';

class TookController extends Controller {

  async serviceList() {
    this.ctx.validate({
      page: { type: 'int', required: false, range: { min: 1 }, desc: '当前页数' },
      size: { type: 'int', required: false, range: { min: 10, max: 1000 }, desc: '每页条数' },
      key: { type: 'string', required: false, desc: 'KEY' },
    });
    const data = Object.assign({ indexName: mapTrackService }, this.ctx.query);
    const result = await this.service.logs.list(data);
    this.ctx.body = {
      page: {
        totalElements: result.hits.total.value, number: this.ctx.query.page || this.config.page.page,
        size: this.ctx.query.size || this.config.page.size,
        totalPages: Math.ceil(result.hits.total.value / (this.ctx.query.size || this.config.page.size)),
      },
      content: result.hits.hits.map(m => Object.assign({ id: m._id }, m._source)),
    };
  }

  async serviceAdd() {
    const { ctx } = this;
    ctx.validate({
      key: { type: 'string', required: true, desc: 'KEY' },
      name: { type: 'string', required: true, desc: '名称' },
    });
    const data = ctx.request.body;
    await ctx.curl('https://tsapi.amap.com/v1/track/service/add', { method: 'POST', data, dataType: 'json' })
      .then(res => {
        if (res.data.errcode === 10000) {
          const service = Object.assign({}, data, { sid: res.data.data.sid, createTime: new Date() });
          this.app.elasticsearch.bulk({ body: [{ index: { _index: mapTrackService } }, service] });
        }
        ctx.body = res.data;
      });
  }

  async serviceUpdate() {
    const { ctx } = this;
    ctx.validate({
      key: { type: 'string', required: true, desc: 'KEY' },
      id: { type: 'string', required: true, desc: 'ID' },
      sid: { type: 'string', required: true, desc: '服务ID' },
      name: { type: 'string', required: true, desc: '名称' },
      desc: { type: 'string', required: false, desc: '描述' },
    });
    const data = ctx.request.body;
    const result = await ctx.curl('https://tsapi.amap.com/v1/track/service/update', { method: 'POST', data });
    await this.app.elasticsearch.update({ index: mapTrackService, id: data.id, body: { doc: { name: data.name, desc: data.desc } } });
    ctx.body = result.data;
  }

  async serviceDelete() {
    const { ctx } = this;
    this.ctx.validate({
      key: { type: 'string', required: true, desc: 'KEY' },
      sid: { type: 'string', required: true, desc: '服务ID' },
      id: { type: 'string', required: true, desc: 'ID' },
    });
    const data = ctx.request.body;
    const result = await ctx.curl('https://tsapi.amap.com/v1/track/service/delete', { method: 'POST', data });
    await this.app.elasticsearch.delete({ index: mapTrackService, id: data.id });
    ctx.body = result.data;
  }

  async terminalList() {
    this.ctx.validate({
      page: { type: 'int', required: false, range: { min: 1 }, desc: '当前页数' },
      size: { type: 'int', required: false, range: { min: 10, max: 1000 }, desc: '每页条数' },
      key: { type: 'string', required: true, desc: 'KEY' },
      sid: { type: 'string', required: true, desc: '服务ID' },
    });
    const data = Object.assign({ indexName: mapTrackTerminal }, this.ctx.query);
    const result = await this.service.logs.list(data);
    this.ctx.body = {
      page: {
        totalElements: result.hits.total.value, number: this.ctx.query.page || this.config.page.page,
        size: this.ctx.query.size || this.config.page.size,
        totalPages: Math.ceil(result.hits.total.value / (this.ctx.query.size || this.config.page.size)),
      },
      content: result.hits.hits.map(m => Object.assign({ id: m._id }, m._source)),
    };
  }

  async terminalAdd() {
    const { ctx } = this;
    ctx.validate({
      key: { type: 'string', required: true, desc: 'KEY' },
      sid: { type: 'string', required: true, desc: '服务ID' },
      name: { type: 'string', required: true, desc: '名称' },
      desc: { type: 'string', required: false, desc: '描述' },
    });
    const data = ctx.request.body;
    await ctx.curl('https://tsapi.amap.com/v1/track/terminal/add', { method: 'POST', data, dataType: 'json' })
      .then(res => {
        if (res.data.errcode === 10000) {
          const terminal = Object.assign({}, data, { tid: res.data.data.tid, createTime: new Date() });
          this.app.elasticsearch.bulk({ body: [{ index: { _index: mapTrackTerminal } }, terminal] });
        }
        ctx.body = res.data;
      });
  }

  async terminalUpdate() {
    const { ctx } = this;
    ctx.validate({
      key: { type: 'string', required: true, desc: 'KEY' },
      id: { type: 'string', required: true, desc: 'ID' },
      sid: { type: 'string', required: true, desc: '服务ID' },
      tid: { type: 'string', required: true, desc: '终端ID' },
      name: { type: 'string', required: true, desc: '名称' },
      desc: { type: 'string', required: false, desc: '描述' },
    });
    const data = ctx.request.body;
    const result = await ctx.curl('https://tsapi.amap.com/v1/track/terminal/update', { method: 'POST', data });
    await this.app.elasticsearch.update({ index: mapTrackTerminal, id: data.id, body: { doc: { name: data.name, desc: data.desc } } });
    ctx.body = result.data;
  }

  async terminalDelete() {
    const { ctx } = this;
    this.ctx.validate({
      key: { type: 'string', required: true, desc: 'KEY' },
      sid: { type: 'string', required: true, desc: '服务ID' },
      tid: { type: 'string', required: true, desc: '终端ID' },
      id: { type: 'string', required: true, desc: 'ID' },
    });
    const data = ctx.request.body;
    const result = await ctx.curl('https://tsapi.amap.com/v1/track/terminal/delete', { method: 'POST', data });
    await this.app.elasticsearch.delete({ index: mapTrackTerminal, id: data.id });
    ctx.body = result.data;
  }

  async terminalTrsearch() {
    const { ctx } = this;
    ctx.validate({
      page: { type: 'int', required: false, range: { min: 1 }, desc: '当前页数' },
      size: { type: 'int', required: false, range: { min: 10, max: 1000 }, desc: '每页条数' },
      key: { type: 'string', required: true, desc: 'KEY' },
      sid: { type: 'string', required: true, desc: '服务ID' },
      tid: { type: 'string', required: true, desc: '终端ID' },
      trid: { type: 'string', required: true, desc: '轨迹ID' },
      correction: { type: 'string', required: false, desc: '对轨迹进行处理' },
      recoup: { type: 'string', required: false, desc: '对轨迹进行补点' },
      gap: { type: 'string', required: false, desc: '补点间距' },
      ispoints: { type: 'string', required: false, desc: '是否返回轨迹点信息' },
    });
    const data = Object.assign({ pagesize: ctx.query.size }, ctx.query);
    const result = await ctx.curl('https://tsapi.amap.com/v1/track/terminal/trsearch', { data });
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  }

  async traceList() {
    this.ctx.validate({
      page: { type: 'int', required: false, range: { min: 1 }, desc: '当前页数' },
      size: { type: 'int', required: false, range: { min: 10, max: 1000 }, desc: '每页条数' },
      key: { type: 'string', required: true, desc: 'KEY' },
      sid: { type: 'string', required: true, desc: '服务ID' },
      tid: { type: 'string', required: true, desc: '终端ID' },
    });

    const data = Object.assign({ indexName: mapTrackTrace }, this.ctx.query);
    const result = await this.service.logs.list(data);
    this.ctx.body = {
      page: {
        totalElements: result.hits.total.value, number: this.ctx.query.page || this.config.page.page,
        size: this.ctx.query.size || this.config.page.size,
        totalPages: Math.ceil(result.hits.total.value / (this.ctx.query.size || this.config.page.size)),
      },
      content: result.hits.hits.map(m => Object.assign({ id: m._id }, m._source)),
    };
  }

  async traceAdd() {
    const { ctx } = this;
    ctx.validate({
      key: { type: 'string', required: true, desc: 'KEY' },
      sid: { type: 'string', required: true, desc: '服务ID' },
      tid: { type: 'string', required: true, desc: '服务ID' },
      trname: { type: 'string', required: false, desc: '名称' },
    });
    const data = ctx.request.body;
    await ctx.curl('https://tsapi.amap.com/v1/track/trace/add', { method: 'POST', data, dataType: 'json' })
      .then(res => {
        if (res.data.errcode === 10000) {
          const trace = Object.assign({}, data, { trid: res.data.data.trid, createTime: new Date() });
          this.app.elasticsearch.bulk({ body: [{ index: { _index: mapTrackTrace } }, trace] });
        }
        ctx.body = res.data;
      });
  }

  async traceDelete() {
    const { ctx } = this;
    this.ctx.validate({
      key: { type: 'string', required: true, desc: 'KEY' },
      sid: { type: 'string', required: true, desc: '服务ID' },
      tid: { type: 'string', required: true, desc: '终端ID' },
      trid: { type: 'string', required: true, desc: '轨迹ID' },
      id: { type: 'string', required: true, desc: 'ID' },
    });
    const data = ctx.request.body;
    const result = await ctx.curl('https://tsapi.amap.com/v1/track/trace/delete', { method: 'POST', data });
    await this.app.elasticsearch.delete({ index: mapTrackTrace, id: data.id });
    ctx.body = result.data;
  }

  async traceUpload() {
    const { ctx } = this;
    const result = await ctx.curl('https://tsapi.amap.com/v1/track/point/upload', { method: 'POST', data: ctx.request.body });
    ctx.body = result.data;
  }

}

module.exports = TookController;
