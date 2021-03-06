class DefaultAlertsService {
  constructor(options) {
    const self = this;
    self.defaultAlertsRepository = options.defaultAlertsRepository;
    self.logger = options.logger;
  }

  getItems(options) {
    const self = this;
    try {
      return self.defaultAlertsRepository.getItems(options);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }

  updateItem(entity) {
    const self = this;
    try {
      return self.defaultAlertsRepository.updateItem(entity);
    } catch (error) {
      self.logger.error(error);
      throw error;
    }
  }
}

module.exports = DefaultAlertsService;
