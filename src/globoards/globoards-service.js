const GloSDK = require('@axosoft/glo-sdk');
const a = require('axios');

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
      const columns = await GloSDK(options.token).boards.get(options.boardId, { fields: ['columns'] });
      return columns;
    } catch (error) {
      throw error;
    }
  }

  async getCardsForBoard(options) {
    try {
      const axios = a.create({
        baseURL: 'https://gloapi.gitkraken.com/v1/',
        headers: {
          Authorization: options.token,
        },
      });
      const cards = await axios.get(`glo/boards/${options.boardId}/cards`);
      return cards.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GloboardsService;
