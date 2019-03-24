const say = require('say');

/* eslint-disable no-unused-vars */

class SayAlertPlayer {
  constructor(options) {
    const self = this;
    self.logger = options.logger;
  }

  play(alert) {
    const self = this;
    return new Promise((resolve, reject) => {
      try {
        self.logger.debug(`Saying: ${alert.text}`);
        say.speak(alert.text, null, null, (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      } catch (error) {
        self.logger.error(error);
        throw error;
      }
    });
  }
}

module.exports = SayAlertPlayer;
