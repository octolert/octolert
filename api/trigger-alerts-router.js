const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { serviceRouter, triggersAlertsService } = options;
  const route = '/api/triggeralerts';
  const itemRoute = '/api/triggeralerts/:id';

  router.route(route)
    .get((req, res) => {
      const entities = options.triggersAlertsService.getItems();
      res.status(200).send(entities);
    })
    .post((req, res) => {
      const entity = options.triggersAlertsService.addItem(req.body);
      res.status('200').send(entity);
    });

  router.route(itemRoute)
    .get((req, res) => {
      const entity = options.triggersAlertsService.getItem(req.params.id);
      res.status(200).send(entity);
    })
    .put((req, res) => {
      serviceRouter.logPut(route, req);
      const entity = req.body;
      entity.id = req.params.id;
      options.triggersAlertsService.updateItem(entity);
      res.status(200).send(entity);
    })
    .delete((req, res) => {
      options.triggersAlertsService.deleteItem(req.params.id);
      res.status(200).send();
    });

  return router;
};

module.exports = getRouter;
