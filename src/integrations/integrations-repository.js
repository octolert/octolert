class IntegrationsRepository {
  constructor() {
    const self = this;
    self.items = [];
  }

  getItems() {
    const self = this;
    return self.items;
  }

  getItem(name) {
    const self = this;
    for (let i = 0; i < self.items.length; i += 1) {
      const item = self.items[i];
      if (item.name === name) {
        return item;
      }
    }
    return null;
  }

  addItem(entity) {
    const self = this;
    self.items.push(entity);
  }

  updateItem(entity) {
    const self = this;
    for (let i = 0; i < self.items.length; i += 1) {
      const item = self.items[i];
      if (item.name === entity.name) {
        self.items[i] = entity;
      }
    }
  }

  deleteItem(name) {
    const self = this;
    for (let i = 0; i < self.items.length; i += 1) {
      const item = self.items[i];
      if (item.name === name) {
        self.items.splice(i, 1);
      }
    }
  }
}

module.exports = IntegrationsRepository;
