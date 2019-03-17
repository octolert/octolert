const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/api/integrations/')
    .get((req, res) => {
    // USE EXPRESS TO REDIRECT
      res.status('200').send({
        setting1: 'hello world 2',
      });
    });

  router.route('/auth/globoards/token')
    .get((req, res) => {
      // GET TOKEN FROM REQUEST
      // SAVE TOKEN TO TOKEN STORAGE (tokens service)
      options.tokensService.saveToken();
      res.status('200').send({
        setting1: 'hello world 2',
      });
    });

  return router;
};

module.exports = getRouter;
