const express = require('express');

const getRouter = (options) => {
  const router = express.Router();
  const { logger, alertPlayer } = options;
  const route = '/api/alertplayer/';

  router.route(route)
    .post((req, res) => {
      logger.debug(`POST: ${route}`);
      logger.debug(`Request Body: ${req.body}`);
      const entities = req.body;
      alertPlayer.play(entities).then(() => {
        logger.debug('Success');
        res.status(200).send();
      }).catch((reason) => {
        logger.error(reason);
        res.status(500).send(reason);
      });
    });

  return router;
};

module.exports = getRouter;
