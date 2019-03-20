class DefaultAlertsRepository {
  constructor() {
    const self = this;
    self.items = [
      {
        type: 'say',
        action: 'globoard-cardforward',
        attributes: [
          { text: 'Congrats {assignee} {person} has passed {card} to {next-state}' },
        ],
      },
      {
        type: 'say',
        action: 'globoard-cardback',
        attributes: [
          { text: 'Aww crumpets {assignee} {person} has pushed {card} to {next-state}' },
        ],
      },
    ];
  }

  getItems(options) {
    const self = this;
    return self.items;
  }

  updateItem(entity) {
    const self = this;
    self.items = entity;
    return self.items;
  }
}

module.exports = DefaultAlertsRepository;
