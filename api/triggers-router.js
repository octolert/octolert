const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const route = '/api/triggers';
  const itemRoute = '/api/triggers/:id';
  const { serviceRouter, triggersService } = options;

  router.route(route)
    .get((req, res) => {
      serviceRouter.logGet(route);
      const request = {
        integrationId: req.query.integrationId,
        sourceId: req.query.sourceId,
      };
      triggersService.getItems(request).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .post((req, res) => {
      serviceRouter.logPost(route, req);
      triggersService.createItem(req.body).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    });

  router.route(itemRoute)
    .get((req, res) => {
      serviceRouter.logGetItem(route);
      triggersService.getItem(req.params.id).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .put((req, res) => {
      serviceRouter.logPut(route, req);
      const entity = req.body;
      entity.id = req.params.id;
      triggersService.updateItem(entity).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .delete((req, res) => {
      serviceRouter.logDelete(route);
      triggersService.deleteItem(req.params.id).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    });

  return router;
};

module.exports = getRouter;
