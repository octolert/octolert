/* eslint-disable no-console */
/**
 * @copyright Octolert
*/

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const authGloBoardsRouter = require('./src/routes/auth-globoards-router.js');
const boardsRouter = require('./api/boards-router.js');
const settingsRouter = require('./api/settings-router.js');
const triggerAlertsRouter = require('./api/trigger-alerts-router.js');
const triggersRouter = require('./api/triggers-router.js');
const integrationsRouter = require('./api/integrations-router.js');
const IntegrationsRepository = require('./src/integrations/integrations-repository.js');
const IntegrationsService = require('./src/integrations/integrations-service.js');

const EventsProcessor = require('./src/events-processor.js');

const eventsProcessor = new EventsProcessor({ delay: 60000 });
eventsProcessor.start();

const integrationsRepository = new IntegrationsRepository();
const integrationsService = new IntegrationsService({ integrationsRepository });

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
app.use(authGloBoardsRouter({ integrationsService }));
app.use(integrationsRouter({ integrationsService }));
app.use(boardsRouter);
app.use(settingsRouter);
app.use(triggerAlertsRouter);
app.use(triggersRouter);
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