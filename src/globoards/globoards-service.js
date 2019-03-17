const GloSDK = require('@axosoft/glo-sdk');
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
class GloboardsService {
  constructor(options) {
    // const authToken = options.integrationsService.accessToken('globoards');
  }

  getBoards(options) {
    GloSDK(options.token).boards.getAll()
      .then((boards) => {
        console.log(boards);
        return boards;
      })
      .catch(error => console.error(error));
  }

  getColumnsForBoard(options) {
    GloSDK(options.token).boards.get('5beb506267f0ab000e7d4659')
      .then((board) => {
        console.log(board.columns);
      });
    // .catch(error => console.error(error));
  }

  getCardsForBoard(options) {

  }
}

module.exports = GloboardsService;
