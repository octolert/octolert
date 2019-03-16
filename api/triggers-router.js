const express = require('express');

const TriggersRepository = require('../src/triggers/triggers-respository.js');
const TriggersService = require('../src/triggers/triggers-service.js');

const triggersRouter = express.Router();
const triggersRepository = new TriggersRepository();
const triggersService = new TriggersService({ triggersRepository });

triggersRouter.route('/api/triggers')
  .get((req, res) => {
    const entities = triggersService.getItems();
    res.status(200).send(entities);
  })
  .post((req, res) => {
    const entity = triggersService.addItem(req.body);
    res.status('200').send(entity);
  });

triggersRouter.route('/api/triggers/:id')
  .get((req, res) => {
    const entity = triggersService.getItem(req.params.id);
    res.status(200).send(entity);
  })
  .put((req, res) => {
    const entity = req.body;
    entity.id = req.params.id;
    triggersService.updateItem(entity);
    res.status(200).send(entity);
  })
  .delete((req, res) => {
    triggersService.deleteItem(req.params.id);
    res.status(200).send();
  });

module.exports = triggersRouter;
