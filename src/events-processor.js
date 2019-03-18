class EventsProcessor {
  constructor(options) {
    const self = this;
    self.delay = options.delay;
    self.running = false;
    self.integrationsService = options.integrationsService;
    self.triggersService = options.triggersService;
    self.triggerAlertsService = options.triggerAlertsService;
  }

  start() {
    const self = this;
    console.log('Starting');
    self.running = true;
    self.process(self);
  }

  stop() {
    const self = this;
    console.log('Stopping');
    self.running = false;
  }

  // eslint-disable-next-line class-methods-use-this
  process(processor) {
    const self = processor;
    console.log('Processing Events...');
    if (self.running) {
      // loop through each integration
      processor.integrationsService.getItems().then((result) => {
        const integrations = result;
        console.log(`${integrations.length} Integrations Found.`);
        for (let i = 0; i < integrations.length; i += 1) {
          const integration = integrations[i];
          const triggers = processor.triggersService.getItems({ integrationId: integration.id });
          for (let j = 0; j < triggers.length; j += 1) {
            // check to see if any triggers have been met
          }
        }

        // get the cards for the integration

        // check against previous cards

        // work out what events have happened

        // go through each trigger. If event matches trigger. then fire alerts by

        // get all alerts for the trigger

        // fire off each alert

        setTimeout(self.process, processor.delay, processor);
      }).catch((reason) => {
        console.log(reason);
        setTimeout(self.process, processor.delay, processor);
      });
    }
  }
}

module.exports = EventsProcessor;
