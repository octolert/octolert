const say = require('say');

/* eslint-disable no-unused-vars */

class SayAlertPlayer {
  play(alert) {
    const self = this;
    return new Promise((resolve, reject) => {
      console.log(`Saying: ${alert.text}`);
      say.speak(alert.text, null, null, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = SayAlertPlayer;
