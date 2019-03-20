const say = require('say');

/* eslint-disable no-unused-vars */

class SayAlert {
  alert(options) {
    const self = this;
    try {
      say.speak(options);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SayAlert;
