const express = require('express');

const configRouter = express.Router();

configRouter.route('/api/eventalerts')
  .get((req, res) => {
    res.status('200').send({
      setting1: 'hello world',
    });
  });

module.exports = configRouter;
