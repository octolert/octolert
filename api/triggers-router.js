const express = require('express');

const triggersRouter = express.Router();

triggersRouter.route('/api/triggers')
  .get((req, res) => {
    res.status('200').send({
      setting1: 'hello world',
    });
  });

module.exports = triggersRouter;
