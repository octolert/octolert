const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/integrations/globoards/boards')
    .get((req, res) => {
      const integration = options.integrationsService.getItem('globoards');
      options.globoardsService.getBoards({
        token: integration.attributes.token,
      }).then((response) => {
        res.status('200').send(response);
      }).catch((err) => {
        console.log(err);
      });
    });

  router.route('/integrations/globoards/columns')
    .get((req, res) => {
      const integration = options.integrationsService.getItem('globoards');
      options.globoardsService.getColumnsForBoard({
        token: integration.attributes.token,
        boardId: req.query.boardId,
      }).then((response) => {
        res.status('200').send(response);
      }).catch((err) => {
        console.log(err);
      });
    });

  router.route('/integrations/globoards/cards')
    .get((req, res) => {
      const integration = options.integrationsService.getItem('globoards');
      const cards = options.globoardsService.getCardsForBoard({
        token: integration.attributes.token,
        boardId: req.query.boardId,
      });
      res.status('200').send(cards);
    });

  return router;
};

module.exports = getRouter;
