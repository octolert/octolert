const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { logger, integrationsService } = options;
  const route = '/api/integrations';
  const itemRoute = '/api/integrations/:name';

  router.route(route)
    .get((req, res) => {
      logger.debug(`GET: ${route}`);
      integrationsService.getItems().then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    })
    .post((req, res) => {
      logger.debug(`POST: ${route}`);
      integrationsService.addItem(req.body).then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    });

  router.route(itemRoute)
    .get((req, res) => {
      logger.debug(`GET: ${route}`);
      integrationsService.getItem(req.params.name).then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    })
    .put((req, res) => {
      logger.debug(`PUT: ${route}`);
      const entity = req.body;
      entity.name = req.params.name;
      integrationsService.updateItem(entity).then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    })
    .delete((req, res) => {
      logger.debug(`DELETE: ${route}`);
      integrationsService.deleteItem(req.params.name).then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    });

  return router;
};

module.exports = getRouter;
