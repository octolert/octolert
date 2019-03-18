const GloSDK = require('@axosoft/glo-sdk');
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
class GloboardsService {
  constructor(options) {
  }

  async getBoards(options) {
    try {
      const boards = await GloSDK(options.token).boards.getAll();
      return boards;
    } catch (error) {
      throw error;
    }
  }

  async getColumnsForBoard(options) {
    try {
      const columns = await GloSDK(options.token).boards.get('5beb506267f0ab000e7d4659', {});
      return columns;
    } catch (error) {
      throw error;
    }
  }

  getCardsForBoard(options) {

  }
}

module.exports = GloboardsService;
