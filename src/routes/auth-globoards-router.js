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
      options.integrationsService.addItem(integration).then((result) => {
        res.redirect(`https://app.gitkraken.com/oauth/authorize?response_type=code&client_id=${result.attributes.clientId}&scope=board:read`);
      }).catch((reason) => {
        console.log(reason);
      });
    });

  router.route('/auth/globoards/token')
    .get((req, res) => {
      const { code } = req.query;
      options.integrationsService.getItem('globoards').then((result) => {
        axios({
          method: 'post',
          url: 'https://api.gitkraken.com/oauth/access_token',
          data: {
            grant_type: 'authorization_code',
            client_id: result.attributes.clientId,
            client_secret: result.attributes.secret,
            code,
          },
        }).then((response) => {
          const accessToken = response.data.access_token;
          options.integrationsService.saveToken({ name: 'globoards', token: accessToken });
          res.status('200').redirect('/api/integrations');
        }).catch((err) => {
          console.log(err);
        });
      }).catch((reason) => {
        console.log(reason);
      });
    });
  return router;
};

module.exports = getRouter;
