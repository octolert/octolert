const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/api/integrations')
    .get((req, res) => {
      options.integrationsService.getItems().then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    })
    .post((req, res) => {
      options.integrationsService.addItem(req.body).then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    });

  router.route('/api/integrations/:name')
    .get((req, res) => {
      options.integrationsService.getItem(req.params.name).then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    })
    .put((req, res) => {
      const entity = req.body;
      entity.name = req.params.name;
      options.integrationsService.updateItem(entity).then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    })
    .delete((req, res) => {
      options.integrationsService.deleteItem(req.params.name).then((result) => {
        res.status(200).send(result);
      }).catch((reason) => {
        console.log(reason);
        res.status(500).send('error');
      });
    });

  return router;
};

module.exports = getRouter;
