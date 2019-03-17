class EventsProcessor {
  constructor(options) {
    const self = this;
    self.delay = options.delay;
    self.running = false;
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
      setTimeout(self.process, processor.delay, processor);
    }
  }
}

module.exports = EventsProcessor;
