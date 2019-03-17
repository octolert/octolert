class IntegrationsService {
  constructor(options) {
    const self = this;
    self.integrationsRepository = options.integrationsRepository;
  }

  getItems() {
    const self = this;
    return self.integrationsRepository.getItems();
  }

  getItem(name) {
    const self = this;
    return self.integrationsRepository.getItem(name);
  }

  addItem(entity) {
    const self = this;
    self.integrationsRepository.addItem(entity);
    return entity;
  }

  updateItem(entity) {
    const self = this;
    self.integrationsRepository.updateItem(entity);
    return entity;
  }

  deleteItem(name) {
    const self = this;
    self.integrationsRepository.deleteItem(name);
  }

  saveToken(options) {
    const self = this;
    const entity = self.getItem(options.name);
    if (entity == null) {
      throw new Error('could not find integration.');
    }
    entity.attributes.token = options.token;
    self.updateItem(entity);
  }
}
module.exports = IntegrationsService;
