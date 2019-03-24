const express = require('express');

const getRouter = () => {
  const router = express.Router();

  router.route('/status/am-i-up')
    .get((req, res) => {
      res.status(200).send('OK');
    });

  return router;
};

module.exports = getRouter;
