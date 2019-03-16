class TriggersRepository {
  constructor() {
    const self = this;
    self.items = [];
  }

  getItems() {
    const self = this;
    return self.items;
  }

  getItem(id) {
    const self = this;
    for (let i = 0; i < self.items.length; i += 1) {
      const item = self.items[i];
      if (item.id === id) {
        return id;
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
      if (item.id === entity.id) {
        self.items[i] = entity;
      }
    }
  }

  deleteItem(entity) {
    const self = this;
    for (let i = 0; i < self.items.length; i += 1) {
      const item = self.items[i];
      if (item.id === entity.id) {
        self.items.splice(i, 1);
      }
    }
  }
}

module.exports = TriggersRepository;
