const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { defaultAlertsService, serviceRouter } = options;
  const route = '/api/default-alerts';

  router.route(route)
    .get((req, res) => {
      serviceRouter.logGet(route);
      try {
        const entities = defaultAlertsService.getItems();
        serviceRouter.success(res, entities);
      } catch (reason) {
        serviceRouter.error(reason, res);
      }
    })
    .post((req, res) => {
      serviceRouter.logPost(route, req);
      try {
        const entity = defaultAlertsService.updateItem(req.body);
        serviceRouter.success(res, entity);
      } catch (reason) {
        serviceRouter.error(reason);
      }
    });

  return router;
};

module.exports = getRouter;
