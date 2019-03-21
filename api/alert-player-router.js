const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/api/alertplayer/')
    .post((req, res) => {
      const entities = req.body;
      options.alertPlayer.play(entities).then(() => {
        res.status(200).send();
      }).catch((reason) => {
        res.status(500).send(reason);
      });
    });

  return router;
};

module.exports = getRouter;
