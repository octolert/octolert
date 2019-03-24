class TriggersService {
  constructor(options) {
    const self = this;
    self.triggersRepository = options.triggersRepository;
  }

  async getItems() {
    const self = this;
    try {
      const entities = await self.triggersRepository.getItems();
      return entities;
    } catch (error) {
      throw error;
    }
  }

  getItem(id) {
    const self = this;
    try {
      const entity = self.triggersRepository.getItem(id);
      return entity;
    } catch (error) {
      throw error;
    }
  }

  createItem(entity) {
    const self = this;
    try {
      return self.triggersRepository.createItem(entity);
    } catch (error) {
      throw error;
    }
  }

  updateItem(entity) {
    const self = this;
    try {
      return self.eventsRepository.updateItem(entity);
    } catch (error) {
      throw error;
    }
  }

  deleteItem(id) {
    const self = this;
    try {
      return self.triggersRepository.deleteItem(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TriggersService;
