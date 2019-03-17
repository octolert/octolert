class IntegrationsService {
  constructor(options) {
    const self = this;
    self.integrationRepository = options.integrationRepository;
  }

  getItems() {
    const self = this;
    return self.integrationRepository.getItems();
  }

  getItem(name) {
    const self = this;
    return self.integrationRepository.getItem(name);
  }

  addItem(entity) {
    const self = this;
    self.integrationRepository.addItem(entity);
    return entity;
  }

  updateItem(entity) {
    const self = this;
    self.integrationRepository.updateItem(entity);
    return entity;
  }

  deleteItem(name) {
    const self = this;
    self.integrationRepository.deleteItem(name);
  }
}

module.exports = IntegrationsService;
