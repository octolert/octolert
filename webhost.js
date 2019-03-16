/**
 * @copyright Matthew Bill
*/

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const authGloBoardsRouter = require('./src/routes/auth-globoards-router.js');
const boardsRouter = require('./api/boards-router.js');
const configRouter = require('./api/config-router.js');
const triggerAlertsRouter = require('./api/trigger-alerts-router.js');
const triggersRouter = require('./api/triggers-router.js');
const TokensService = require('./src/tokens/tokens-service.js');

const tokensService = new TokensService();

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
app.use(authGloBoardsRouter(tokensService));
app.use(boardsRouter);
app.use(configRouter);
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