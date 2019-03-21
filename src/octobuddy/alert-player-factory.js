/* eslint-disable class-methods-use-this */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
class AlertPlayerFactory {
  getAlert(type) {
    const AlertPlayer = require(`./alert-players/${type}-alert-player.js`);
    return new AlertPlayer();
  }
}

module.exports = AlertPlayerFactory;
