const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { serviceRouter, triggerAlertsService } = options;
  const route = '/api/triggeralerts';
  const itemRoute = '/api/triggeralerts/:id';

  router.route(route)
    .get((req, res) => {
      serviceRouter.logGet(route);
      triggerAlertsService.getItems().then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .post((req, res) => {
      serviceRouter.logPost(route, req);
      triggerAlertsService.createItem(req.body).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    });

  router.route(itemRoute)
    .get((req, res) => {
      serviceRouter.logGetItem(route);
      triggerAlertsService.getItem(req.params.id).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .put((req, res) => {
      serviceRouter.logPut(route, req);
      const entity = req.body;
      entity.id = req.params.id;
      triggerAlertsService.updateItem(entity).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .delete((req, res) => {
      triggerAlertsService.deleteItem(req.params.id).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    });

  return router;
};

module.exports = getRouter;
