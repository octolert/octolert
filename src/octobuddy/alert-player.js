/* eslint-disable no-await-in-loop */
const AlertFactory = require('./alert-player-factory.js');

class AlertPlayer {
  constructor() {
    const self = this;
    self.alertFactory = new AlertFactory();
  }

  async play(alerts) {
    const self = this;
    for (let i = 0; i < alerts.length; i += 1) {
      const alert = alerts[i];
      const alertPlayer = self.alertFactory.getAlert(alert.type);
      await alertPlayer.play(alert);
    }
  }
}

module.exports = AlertPlayer;
