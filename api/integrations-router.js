const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { integrationsService, serviceRouter } = options;
  const route = '/api/integrations';
  const itemRoute = '/api/integrations/:name';

  router.route(route)
    .get((req, res) => {
      serviceRouter.logGet(route);
      integrationsService.getItems().then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .post((req, res) => {
      serviceRouter.logPost(route, req);
      integrationsService.addItem(req.body).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    });

  router.route(itemRoute)
    .get((req, res) => {
      serviceRouter.logGetItem(itemRoute);
      integrationsService.getItem(req.params.name).then((result) => {
        serviceRouter.success(result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .put((req, res) => {
      serviceRouter.logPut(itemRoute, req);
      const entity = req.body;
      entity.name = req.params.name;
      integrationsService.updateItem(entity).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    })
    .delete((req, res) => {
      serviceRouter.logDelete(itemRoute);
      integrationsService.deleteItem(req.params.name).then((result) => {
        serviceRouter.success(res, result);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    });

  return router;
};

module.exports = getRouter;
