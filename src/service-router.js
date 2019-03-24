const RestMethods = require('./rest-methods.js');

class ServiceRouter {
  constructor(options) {
    const self = this;
    self.logger = options.logger;
  }

  logPost(route, req) {
    const self = this;
    self.logger.debug(`${RestMethods.POST}: ${route}`);
    self.logger.debug(`Request Body: ${req.body}`);
  }

  success(res) {
    const self = this;
    self.logger.debug('Success');
    res.status(200).send();
  }

  error(reason, res) {
    const self = this;
    self.logger.error(reason);
    res.status(500).send(reason);
  }
}

module.exports = ServiceRouter;
