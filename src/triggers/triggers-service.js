/* eslint-disable no-param-reassign */
const uuidv1 = require('uuid/v1');

class TriggersService {
  constructor(options) {
    const self = this;
    self.triggersRepository = options.triggersRepository;
    self.logger = options.logger;
  }

  async getItems(options) {
    const self = this;
    try {
      const entities = await self.triggersRepository.getItems(options);
      return entities;
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  getItem(id) {
    const self = this;
    try {
      const entity = self.triggersRepository.getItem(id);
      return entity;
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  createItem(entity) {
    const self = this;
    try {
      entity.id = uuidv1();
      return self.triggersRepository.addItem(entity);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  updateItem(entity) {
    const self = this;
    try {
      return self.eventsRepository.updateItem(entity);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  deleteItem(id) {
    const self = this;
    try {
      return self.triggersRepository.deleteItem(id);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }
}

module.exports = TriggersService;
