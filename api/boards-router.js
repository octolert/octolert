const express = require('express');

const boardsRouter = express.Router();

boardsRouter.route('/api/boards')
  .get((req, res) => {
    res.status('200').send({
      setting1: 'hello world',
    });
  });

module.exports = boardsRouter;
