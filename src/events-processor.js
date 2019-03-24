/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
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
    self.globoardsService = options.globoardsService;
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

  /**
   * Creates a list of sources based on the triggers for an integration
   * @param {} integration
   */
  async createIntegrationSourceSet(integration) {
    const self = this;
    // get triggers for this integration to get a list of unique source ids
    const triggers = await self.triggersService.getItems();
    console.log(`${triggers.length} triggers found for integration ${integration.name}.`);
    const sourcesSet = new Set();
    for (let j = 0; j < triggers.length; j += 1) {
      const trigger = triggers[j];
      if (!sourcesSet.has(trigger.sourceId)) {
        sourcesSet.add(trigger.sourceId);
      }
    }
    console.log(`${sourcesSet.size} unique sources found for integration ${integration.name}.`);
    return sourcesSet;
  }

  /**
   * Creates a map of all the columns for a board
   */
  async createBoardColumnMap(integration, sourceId) {
    const self = this;
    const newColumns = await self.globoardsService.getColumnsForBoard({
      boardId: sourceId,
      token: integration.attributes.token,
    });

    const newColumnsMap = new Map();
    for (let i = 0; i < newColumns.length; i += 1) {
      const newColumn = newColumns[i];
      newColumnsMap.set(newColumn.id, newColumn.position);
    }
  }

  /**
   * Gets a the new cards and then saves them as a map of card id and column id.
   */
  getCardsMap(cards) {
    const cardsMap = new Map();
    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      cardsMap.set(card.id, card.column_id);
    }
    return cardsMap;
  }

  async generateEvents(integration, integrationSourcesMap, sourceId) {
    const self = this;
    const events = [];
    const columnsMap = self.createBoardColumnMap(integration, sourceId);
    const newCards = await self.globoardsService.getCardsForBoard({
      boardId: sourceId,
      token: integration.attributes.token,
    });
    const newCardsMap = self.getCardsMap(integration, sourceId);
    const source = integrationSourcesMap.get(sourceId);
    if (source) {
      // get the current column of card. get pos of current column from map. get old column of card. check two pos and see if movement. raise an event if there has
      const { previousCardsMap } = source;
      for (let i = 0; i < newCards.length; i += 1) {
        const newCard = newCards[i];
        // find card on previous cards map to get column id
        const previousCardColumnId = previousCardsMap.get(newCard.id);
        if (!previousCardColumnId) {
          events.push('globoard-newcard');
        } else {
          const previousColumnPos = columnsMap.get(previousCardColumnId);
          const currentColumnPos = columnsMap.get(newCard.column_id);
          if (previousColumnPos > currentColumnPos) {
            events.push('globoard-cardback');
          } else if (previousColumnPos < currentColumnPos) {
            events.push('globoard-cardfoward');
          }
        }
      }
    }

    source.set(integration.name, {
      previousCardsMap: newCardsMap,
    });

    return events;
  }

  // eslint-disable-next-line class-methods-use-this
  async process(processor) {
    const self = processor;

    if (self.running) {
      console.log('Creating Events...');
      const events = [];
      // loop through each integration
      const integrations = await processor.integrationsService.getItems();
      console.log(`${integrations.length} Integrations Found.`);
      for (let i = 0; i < integrations.length; i += 1) {
        const integration = integrations[i];
        const integrationSources = await processor.createIntegrationSourceSet(integration);

        const integrationSourcesMap = self.integrationsMap.get(integration.name);
        if (!integrationSourcesMap) {
          self.integrationsMap.set(integration.name, new Map());
        }

        for (const sourceId of integrationSources) {
          const sourceEvents = processor.generateEvents(
            integration, integrationSourcesMap, sourceId,
          );
          events.concat(sourceEvents);
        }
      }

      console.log(events);
      // check event against all triggers

      /* console.log(`${triggers.length} triggers found for integration ${integration.name}.`);
          for (let j = 0; j < triggers.length; j += 1) {
            // check to see if any triggers have been met
            const alerts = await processor.triggerAlertsService.getItems();
            console.log(`${alerts.length} alerts found for trigger for integration ${integration.name}.`);
            await self.alertPlayer.play(alerts);
          } */
      // }

      setTimeout(self.process, processor.delay, processor);
    }
  }
}
module.exports = EventsProcessor;
