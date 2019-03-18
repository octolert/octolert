class IntegrationsService {
  constructor(options) {
    const self = this;
    self.integrationsRepository = options.integrationsRepository;
  }

  async getItems() {
    const self = this;
    const items = await self.integrationsRepository.getItems();
    return items;
  }

  async getItem(name) {
    const self = this;
    const item = await self.integrationsRepository.getItem(name);
    return item;
  }

  async addItem(entity) {
    const self = this;
    await self.integrationsRepository.addItem(entity);
    return entity;
  }

  async updateItem(entity) {
    const self = this;
    await self.integrationsRepository.updateItem(entity);
    return entity;
  }

  async deleteItem(name) {
    const self = this;
    await self.integrationsRepository.deleteItem(name);
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
