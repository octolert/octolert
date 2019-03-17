const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/auth/globoards')
    .get((req, res) => {
      // Save integration
      const integration = {
        name: 'globoards',
        app: 'globoards',
        attributes: {
          clientId: req.query.clientId,
          secret: req.query.secret,
          token: '', // set to empty as not yet retrieved
        },
      };
      options.integrationsService.addItem(integration);
      // TODO: Redirect to oauth login for user
      res.status('200').send({
        setting1: 'hello world 2',
      });
    });

  router.route('/auth/globoards/token')
    .get((req, res) => {
      // TODO: GET TOKEN FROM REQUEST
      options.integrationsService.saveToken({ name: 'globoards', token: 'getfromreq' });
      // TODO: Redirect user to page saying sucessful to setup trigger/alerts
      res.status('200').send({
        setting1: 'hello world 2',
      });
    });

  return router;
};

module.exports = getRouter;
