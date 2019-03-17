const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/api/integrations')
    .get((req, res) => {
      const entities = options.integrationsService.getItems();
      res.status(200).send(entities);
    })
    .post((req, res) => {
      const entity = options.integrationsService.addItem(req.body);
      res.status('200').send(entity);
    });

  router.route('/api/integrations/:name')
    .get((req, res) => {
      const entity = options.integrationsService.getItem(req.params.name);
      res.status(200).send(entity);
    })
    .put((req, res) => {
      const entity = req.body;
      entity.name = req.params.name;
      options.integrationsService.updateItem(entity);
      res.status(200).send(entity);
    })
    .delete((req, res) => {
      options.integrationsService.deleteItem(req.params.name);
      res.status(200).send();
    });

  return router;
};

module.exports = getRouter;
