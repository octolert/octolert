class TriggerAlertsService {
  constructor(options) {
    const self = this;
    self.triggerAlertsRepository = options.triggerAlertsRepository;
    self.logger = options.logger;
  }

  async getItems(options) {
    const self = this;
    try {
      const entities = await self.triggerAlertsRepository.getItems(options);
      return entities;
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  async getItem(id) {
    const self = this;
    try {
      const entity = self.triggerAlertsRepository.getItem(id);
      return entity;
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  async createItem(entity) {
    const self = this;
    try {
      return self.triggerAlertsRepository.createItem(entity);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  async updateItem(entity) {
    const self = this;
    try {
      return self.triggerAlertsRepository.updateItem(entity);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  async deleteItem(id) {
    const self = this;
    try {
      return self.triggerAlertsRepository.deleteItem(id);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }
}

module.exports = TriggerAlertsService;
