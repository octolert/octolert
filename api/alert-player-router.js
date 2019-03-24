const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { alertPlayer, serviceRouter } = options;
  const route = '/api/alertplayer/';

  router.route(route)
    .post((req, res) => {
      serviceRouter.logPost(route, req);
      const entities = req.body;
      alertPlayer.play(entities).then(() => {
        serviceRouter.success(res);
      }).catch((reason) => {
        serviceRouter.error(reason, res);
      });
    });

  return router;
};

module.exports = getRouter;
