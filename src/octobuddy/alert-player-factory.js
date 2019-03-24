/* eslint-disable class-methods-use-this */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
class AlertPlayerFactory {
  constructor(options) {
    const self = this;
    self.logger = options.logger;
  }

  getAlert(type) {
    const self = this;
    const AlertPlayer = require(`./alert-players/${type}-alert-player.js`);
    return new AlertPlayer({ logger: self.logger });
  }
}

module.exports = AlertPlayerFactory;
