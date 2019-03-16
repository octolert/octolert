const express = require('express');

const triggerAlertsRouter = express.Router();

triggerAlertsRouter.route('/api/triggeralerts')
  .get((req, res) => {
    res.status('200').send({
      setting1: 'hello world',
    });
  });

module.exports = triggerAlertsRouter;
