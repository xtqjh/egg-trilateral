'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/track/service/list', controller.track.serviceList);
  router.post('/track/service/add', controller.track.serviceAdd);
  router.post('/track/service/update', controller.track.serviceUpdate);
  router.post('/track/service/delete', controller.track.serviceDelete);

  router.get('/track/terminal/list', controller.track.terminalList);
  router.post('/track/terminal/add', controller.track.terminalAdd);
  router.post('/track/terminal/update', controller.track.terminalUpdate);
  router.post('/track/terminal/delete', controller.track.terminalDelete);
  // 查询轨迹
  router.get('/track/terminal/trsearch', controller.track.terminalTrsearch);

  router.get('/track/trace/list', controller.track.traceList);
  router.post('/track/trace/add', controller.track.traceAdd);
  router.post('/track/trace/delete', controller.track.traceDelete);
  // 上传轨迹
  router.post('/track/trace/upload', controller.track.traceUpload);
};
