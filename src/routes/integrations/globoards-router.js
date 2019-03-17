const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/integrations/globoards/boards')
    .get((req, res) => {
      const integration = options.integrationsService.getItem('globoards');
      const boards = options.globoardsService.getBoards({
        token: integration.attributes.token,
      });
      console.log(boards);
      res.status('200').send(boards);
    });

  router.route('/integrations/globoards/columns')
    .get((req, res) => {
      const integration = options.integrationsService.getItem('globoards');
      const columns = options.globoardsService.getColumnsForBoard({
        token: integration.attributes.token,
        boardId: req.query.boardId,
      });
      res.status('200').send(columns);
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
