const ip = require('ip');

class Network {
  static getLocalIp(interfaceName) {
    return ip.address(interfaceName);
  }
}

module.exports = Network;
