class EventsProcessor {
  constructor(options) {
    const self = this;
    self.delay = options.delay;
    self.running = false;
    self.integrationsService = options.integrationsService;
    self.triggersService = options.triggersService;
    self.triggerAlertsService = options.triggerAlertsService;
    self.alertPlayer = options.alertPlayer;
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
  async process(processor) {
    const self = processor;

    if (self.running) {
      console.log('Creating Events...');
      // loop through each integration
      const integrations = await processor.integrationsService.getItems();
      console.log(`${integrations.length} Integrations Found.`);
      for (let i = 0; i < integrations.length; i += 1) {
        const integration = integrations[i];

        // GET EVENTS

        // get list of all cards for board

        // create map of card ids against column ids

        // get list of all cards for board

        // get list of all columns for board

        // create map of column ids to positions

        // loop through each card

        // get the current column of card. get pos of current column from map. get old column of card. check two pos and see if movement. raise an event if there has

        const triggers = await processor.triggersService.getItems({ integrationId: integration.id });

        // check event against all triggers

        console.log(`${triggers.length} triggers found for integration ${integration.name}.`);
        for (let j = 0; j < triggers.length; j += 1) {
          // check to see if any triggers have been met
          const alerts = await processor.triggerAlertsService.getItems();
          console.log(`${alerts.length} alerts found for trigger for integration ${integration.name}.`);
          await self.alertPlayer.play(alerts);
        }
      }
      setTimeout(self.process, processor.delay, processor);
    }
  }
}

module.exports = EventsProcessor;
