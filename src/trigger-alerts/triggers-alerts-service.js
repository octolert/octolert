class TriggerAlertsService {
  constructor(options) {
    const self = this;
    self.triggerAlertsRepository = options.triggerAlertsRepository;
  }

  getItems(options) {
    const self = this;
    try {
      return self.triggerAlertsRepository.getItems(options);
    } catch (error) {
      throw error;
    }
  }

  getItem(id) {
    const self = this;
    try {
      return self.triggerAlertsRepository.getItem(id);
    } catch (error) {
      throw error;
    }
  }

  createItem(entity) {
    const self = this;
    try {
      return self.triggerAlertsRepository.createItem(entity);
    } catch (error) {
      throw error;
    }
  }

  updateItem(entity) {
    const self = this;
    try {
      return self.triggerAlertsRepository.updateItem(entity);
    } catch (error) {
      throw error;
    }
  }

  deleteItem(id) {
    const self = this;
    try {
      return self.triggerAlertsRepository.deleteItem(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TriggerAlertsService;
