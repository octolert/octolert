class EventsProcessor {
  constructor(options) {
    const self = this;
    self.delay = options.delay;
    self.running = false;
    self.integrationsService = options.integrationsService;
    self.triggersService = options.triggersService;
    self.triggerAlertsService = options.triggerAlertsService;
    self.alertPlayer = options.alertPlayer;
    self.integrationsMap = new Map();
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
      /* console.log('Creating Events...');
      // loop through each integration
      const integrations = await processor.integrationsService.getItems();
      console.log(`${integrations.length} Integrations Found.`);
      for (let i = 0; i < integrations.length; i += 1) {
        const integration = integrations[i];

        const newColumns = await proccessor.getColumnsForBoard.getCardsForBoard({
          boardId: integration.sourceId,
          token: integration.token,
        });

        const newColumnsMap = new Map();
        for (let x = 0; x < newColumns.length; x += 1) {
          const newColumn = newColumns[i];
          newColumnsMap.set(newColumn, position);
        }
        

        // get list of all cards for board
        const newCards = await proccessor.globoardsService.getCardsForBoard({
          boardId: integration.sourceId,
          token: integration.token,
        });

        const newCardsMap = new Map();
        for (let x = 0; x < newCards.length; x += 1) {
          const newCard = newCards[i];
          newCardsMap.set(newCard.id, newCards.column_id);
        }

        const integrationDetails = self.integrationsMap.get(integration.name);
        if (!integrationDetails) {
          self.integrationsMap.set(integration.name, {
            previousCardsMap: newCardsMap,
            previousColumnsMap: newColumnsMap,
          });
        }*/


        // get the current column of card. get pos of current column from map. get old column of card. check two pos and see if movement. raise an event if there has

        // const triggers = await processor.triggersService.getItems({ integrationId: integration.id });

        // check event against all triggers

        /* console.log(`${triggers.length} triggers found for integration ${integration.name}.`);
        for (let j = 0; j < triggers.length; j += 1) {
          // check to see if any triggers have been met
          const alerts = await processor.triggerAlertsService.getItems();
          console.log(`${alerts.length} alerts found for trigger for integration ${integration.name}.`);
          await self.alertPlayer.play(alerts);
        }*/
      //}
      setTimeout(self.process, processor.delay, processor);
    }
  }
}

module.exports = EventsProcessor;
