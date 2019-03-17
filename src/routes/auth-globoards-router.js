const express = require('express');
const axios = require('axios');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/auth/globoards')
    .get((req, res) => {
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
      res.redirect(`https://app.gitkraken.com/oauth/authorize?response_type=code&client_id=${integration.attributes.clientId}&scope=board:read`);
    });

  router.route('/auth/globoards/token')
    .get((req, res) => {
      const { code } = req.query;
      const integration = options.integrationsService.getItem('globoards');
      axios({
        method: 'post',
        url: 'https://api.gitkraken.com/oauth/access_token',
        data: {
          grant_type: 'authorization_code',
          client_id: integration.attributes.clientId,
          client_secret: integration.attributes.secret,
          code,
        },
      }).then((response) => {
        console.log(response);
        const accessToken = response.data.access_token;
        options.integrationsService.saveToken({ name: 'globoards', token: accessToken });
        res.status('200').redirect('?message=globoard app integrated successfully');
      }).catch((err) => {
        console.log(err);
      });
    });

  return router;
};

module.exports = getRouter;
