const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/api/default-alerts')
    .get((req, res) => {
      const entities = options.defaultAlertsService.getItems();
      res.status(200).send(entities);
    })
    .post((req, res) => {
      const entity = options.defaultAlertsService.updateItem(req.body);
      res.status('200').send(entity);
    });

  return router;
};

module.exports = getRouter;
