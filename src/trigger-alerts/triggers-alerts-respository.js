const Datastore = require('nedb');
const os = require('os');

class TriggerAlertsRepository {
  constructor() {
    const self = this;
    const homeDir = os.homedir();
    const path = `${homeDir}/octolert/trigger-alerts.json`;
    self.db = new Datastore({ filename: path, autoload: true });
    self.db.loadDatabase();
  }

  getItems(options) {
    const self = this;
    return new Promise((resolve, reject) => {
      const query = {};
      if (options) {
        if (options.triggerId) {
          query.triggerId = options.triggerId;
        }
      }
      self.db.find(query, (err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  getItem(id) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.db.find({ id }, (err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs[0]);
        }
      });
    });
  }

  addItem(entity) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.db.insert(entity, (err, newDoc) => {
        if (err) {
          reject(err);
        }
        resolve(newDoc);
      });
    });
  }

  updateItem(entity) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.db.update({ id: entity.id }, entity, (err, numUpdate) => {
        if (err) {
          reject(err);
        }
        resolve(numUpdate);
      });
    });
  }

  deleteItem(id) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.db.remove({ id }, {}, (err, numRemove) => {
        if (err) {
          reject(err);
        }
        resolve(numRemove);
      });
    });
  }
}

module.exports = TriggerAlertsRepository;
