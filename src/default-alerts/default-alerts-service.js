class DefaultAlertsService {
  constructor(options) {
    const self = this;
    self.defaultAlertsRepository = options.defaultAlertsRepository;
  }

  getItems(options) {
    const self = this;
    try {
      return self.defaultAlertsRepository.getItems(options);
    } catch (error) {
      throw error;
    }
  }

  updateItem(entity) {
    const self = this;
    try {
      return self.defaultAlertsRepository.updateItem(entity);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DefaultAlertsService;
