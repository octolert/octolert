const RestMethods = require('./rest-methods.js');

class ServiceRouter {
  constructor(options) {
    const self = this;
    self.logger = options.logger;
  }

  logPut(route, req) {
    const self = this;
    self.logger.debug(`${RestMethods.PUT}: ${route}`);
    self.logger.debug(`Request Body: ${req.body}`);
  }

  logDelete(route) {
    const self = this;
    self.logger.debug(`${RestMethods.DELETE}: ${route}`);
  }

  logGet(route) {
    const self = this;
    self.logger.debug(`${RestMethods.GET}: ${route}`);
  }

  logGetItem(route) {
    const self = this;
    self.logger.debug(`${RestMethods.GET_ITEM}: ${route}`);
  }

  logGetItemResource(route) {
    const self = this;
    self.logger.debug(`${RestMethods.GET_ITEM_RESOURCE}: ${route}`);
  }

  logPost(route, req) {
    const self = this;
    self.logger.debug(`${RestMethods.POST}: ${route}`);
    self.logger.debug(`Request Body: ${req.body}`);
  }

  success(res, data) {
    const self = this;
    self.logger.debug('Success');
    res.status(200).send(data);
  }

  error(reason, res) {
    const self = this;
    self.logger.error(reason);
    res.status(500).send(reason);
  }
}

module.exports = ServiceRouter;
