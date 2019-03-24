const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { serviceRouter, triggersAlertsService } = options;
  const route = '/api/triggeralerts';
  const itemRoute = '/api/triggeralerts/:id';

  router.route(route)
    .get((req, res) => {
      serviceRouter.logGet(route);
      triggersAlertsService.getItems().then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .post((req, res) => {
      serviceRouter.logPost(route, req);
      triggersAlertsService.addItem(req.body).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    });

  router.route(itemRoute)
    .get((req, res) => {
      serviceRouter.logGetItem(route);
      triggersAlertsService.getItem(req.params.id).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .put((req, res) => {
      serviceRouter.logPut(route, req);
      const entity = req.body;
      entity.id = req.params.id;
      triggersAlertsService.updateItem(entity).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .delete((req, res) => {
      triggersAlertsService.deleteItem(req.params.id).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    });

  return router;
};

module.exports = getRouter;
