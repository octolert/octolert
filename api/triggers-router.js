const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/api/triggers')
    .get((req, res) => {
      const entities = options.triggersService.getItems();
      res.status(200).send(entities);
    })
    .post((req, res) => {
      const entity = options.triggersService.addItem(req.body);
      res.status('200').send(entity);
    });

  router.route('/api/triggers/:id')
    .get((req, res) => {
      const entity = options.triggersService.getItem(req.params.id);
      res.status(200).send(entity);
    })
    .put((req, res) => {
      const entity = req.body;
      entity.id = req.params.id;
      options.triggersService.updateItem(entity);
      res.status(200).send(entity);
    })
    .delete((req, res) => {
      options.triggersService.deleteItem(req.params.id);
      res.status(200).send();
    });

  return router;
};

module.exports = getRouter;
