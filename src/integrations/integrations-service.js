class IntegrationsService {
  constructor(options) {
    const self = this;
    self.integrationsRepository = options.integrationsRepository;
    self.logger = options.logger;
  }

  async getItems() {
    const self = this;
    try {
      const items = await self.integrationsRepository.getItems();
      return items;
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  async getItem(name) {
    const self = this;
    try {
      const item = await self.integrationsRepository.getItem(name);
      return item;
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  async addItem(entity) {
    const self = this;
    try {
      await self.integrationsRepository.addItem(entity);
      return entity;
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  async updateItem(entity) {
    const self = this;
    try {
      await self.integrationsRepository.updateItem(entity);
      return entity;
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  async deleteItem(name) {
    const self = this;
    try {
      await self.integrationsRepository.deleteItem(name);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  async saveToken(options) {
    const self = this;
    try {
      const entity = await self.getItem(options.name);
      if (entity == null) {
        throw new Error('could not find integration.');
      }
      entity.attributes.token = options.token;
      await self.updateItem(entity);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }
}
module.exports = IntegrationsService;
