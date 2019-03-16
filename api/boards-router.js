const express = require('express');

const configRouter = express.Router();

configRouter.route('/api/boards')
  .get((req, res) => {
    res.status('200').send({
      setting1: 'hello world',
    });
  });

module.exports = configRouter;
