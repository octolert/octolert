const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { logger, defaultAlertsService } = options;
  const route = '/api/default-alerts';

  router.route(route)
    .get((req, res) => {
      logger.debug(`GET: ${route}`);
      try {
        const entities = defaultAlertsService.getItems();
        logger.debug('Success');
        res.status(200).send(entities);
      } catch (reason) {
        logger.error(reason);
        res.status(500).send(reason);
      }
    })
    .post((req, res) => {
      logger.debug(`POST: ${route}`);
      logger.debug(`Request Body: ${req.body}`);
      try {
        const entity = defaultAlertsService.updateItem(req.body);
        res.status('200').send(entity);
      } catch (reason) {
        logger.error(reason);
        res.status(500).send(reason);
      }
    });

  return router;
};

module.exports = getRouter;
