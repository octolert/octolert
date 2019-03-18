const express = require('express');

const getRouter = (options) => {
  const router = express.Router();

  router.route('/integrations/globoards/boards')
    .get((req, res) => {
      options.integrationsService.getItem('globoards').then((resp) => {
        options.globoardsService.getBoards({
          token: resp.attributes.token,
        }).then((response) => {
          res.status('200').send(response);
        }).catch((err) => {
          console.log(err);
        });
      });
    });

  router.route('/integrations/globoards/columns')
    .get((req, res) => {
      options.integrationsService.getItem('globoards')
        .then((result) => {
          options.globoardsService.getColumnsForBoard({
            token: result.attributes.token,
            boardId: req.query.boardId,
          }).then((response) => {
            res.status('200').send(response);
          }).catch((err) => {
            console.log(err);
          });
        });
    });

  router.route('/integrations/globoards/cards')
    .get((req, res) => {
      options.integrationsService.getItem('globoards')
        .then((result) => {
          options.globoardsService.getCardsForBoard({
            token: result.attributes.token,
            boardId: req.query.boardId,
          }).then((response) => {
            res.status('200').send(response);
          }).catch((err) => {
            console.log(err);
          });
        });
    });

  return router;
};

module.exports = getRouter;
