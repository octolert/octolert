const express = require('express');

/**
 * Health checks based on hootsuite specification: https://hootsuite.github.io/health-checks-api/
 */
const getRouter = () => {
  const router = express.Router();

  router.route('/status/am-i-up')
    .get((req, res) => {
      res.status(200).send('OK');
    });

  return router;
};

module.exports = getRouter;
