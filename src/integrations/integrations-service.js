class IntegrationsService {
  constructor(options) {
    const self = this;
    self.integrationsRepository = options.integrationsRepository;
  }

  async getItems() {
    const self = this;
    try {
      const items = await self.integrationsRepository.getItems();
      return items;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getItem(name) {
    const self = this;
    try {
      const item = await self.integrationsRepository.getItem(name);
      return item;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addItem(entity) {
    const self = this;
    try {
      await self.integrationsRepository.addItem(entity);
      return entity;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateItem(entity) {
    const self = this;
    try {
      await self.integrationsRepository.updateItem(entity);
      return entity;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteItem(name) {
    const self = this;
    try {
      await self.integrationsRepository.deleteItem(name);
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveToken(options) {
    const self = this;
    const entity = await self.getItem(options.name);
    if (entity == null) {
      throw new Error('could not find integration.');
    }
    entity.attributes.token = options.token;
    await self.updateItem(entity);
  }
}
module.exports = IntegrationsService;
