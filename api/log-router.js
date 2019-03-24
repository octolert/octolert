const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { serviceRouter } = options;
  const route = '/api/logs/';

  router.route(route)
    .get((req, res) => {
      serviceRouter.logGet(route);
      serviceRouter.success(res);
    });

  return router;
};

module.exports = getRouter;
