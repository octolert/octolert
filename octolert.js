/* eslint-disable no-console */
/**
 * @copyright Octolert
*/

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const authGloBoardsRouter = require('./src/routes/auth-globoards-router.js');
const globoardsRouter = require('./src/routes/integrations/globoards-router.js');
const settingsRouter = require('./api/settings-router.js');
const triggerAlertsRouter = require('./api/trigger-alerts-router.js');
const triggersRouter = require('./api/triggers-router.js');
const alertPlayerRouter = require('./api/alert-player-router.js');
const integrationsRouter = require('./api/integrations-router.js');
const defaultAlertsRouter = require('./api/default-alerts-router.js');
const IntegrationsRepository = require('./src/integrations/integrations-repository.js');
const IntegrationsService = require('./src/integrations/integrations-service.js');
const TriggersRepository = require('./src/triggers/triggers-respository.js');
const TriggersService = require('./src/triggers/triggers-service.js');
const TriggerAlertsRepository = require('./src/trigger-alerts/triggers-alerts-respository.js');
const TriggerAlertsService = require('./src/trigger-alerts/triggers-alerts-service.js');
const GloboardsService = require('./src/globoards/globoards-service.js');
const DefaultAlertsRepository = require('./src/default-alerts/default-alerts-repository.js');
const DefaultAlertsService = require('./src/default-alerts/default-alerts-service.js');
const AlertPlayer = require('./src/octobuddy/alert-player.js');

const EventsProcessor = require('./src/events-processor.js');

const globoardsService = new GloboardsService();

const integrationsRepository = new IntegrationsRepository();
const integrationsService = new IntegrationsService({ integrationsRepository });

const defaultAlertsRepository = new DefaultAlertsRepository();
const defaultAlertsService = new DefaultAlertsService({ defaultAlertsRepository });

const triggersRepository = new TriggersRepository();
const triggersService = new TriggersService({ triggersRepository });

const triggerAlertsRepository = new TriggerAlertsRepository();
const triggerAlertsService = new TriggerAlertsService({
  triggerAlertsRepository,
});

const alertPlayer = new AlertPlayer();

const eventsProcessor = new EventsProcessor({
  delay: 60000,
  integrationsService,
  triggersService,
  triggerAlertsService,
});
eventsProcessor.start();

const app = express();

const configuration = {
  port: 13378,
  environment: 'development',
  isDebug: false,
  basePath: '',
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.enable('trust proxy');
app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'src'));

app.use(configuration.basePath, express.static(path.join(`${__dirname}/public`)));
app.use(globoardsRouter({ integrationsService, globoardsService }));
app.use(authGloBoardsRouter({ integrationsService }));
app.use(integrationsRouter({ integrationsService }));
app.use(settingsRouter);
app.use(triggerAlertsRouter({ triggerAlertsService }));
app.use(triggersRouter({ triggersService }));
app.use(defaultAlertsRouter({ defaultAlertsService }));
app.use(alertPlayerRouter({ alertPlayer }));
app.get('*', (req, res) => {
  console.log('GET Request Received.');
  res.status(200)
    .render('index', {
      isDebug: configuration.isDebug,
      basePath: configuration.basePath,
      appData: {
      },
    });
});

app.listen(configuration.port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`==> 🌎 Listening on port ${configuration.port}. Open up http://localhost:${configuration.port}/ in your browser.`);
});
