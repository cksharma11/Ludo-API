const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Games = require('./model/games');

const app = express();

app.games = new Games();

const PORT = process.env.PORT || process.env.API_PORT;

const gameHandlers = require('./src/setup/handlers');

const {
  getGameData,
  rollDice,
  coinPositionHandler
} = require('./src/gameHandler');

const logger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.method, req.url);
  next();
};

app.use(bodyParser());
app.use(logger);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello API!');
});

app.post('/saveGame', gameHandlers.saveGame);
app.post('/loadGame', gameHandlers.loadGame);
app.post('/createGame', gameHandlers.createGame);
app.post('/players', gameHandlers.getPlayers);
app.post('/joinGame', gameHandlers.joinGame);
app.post('/getGameData', getGameData);
app.post('/rollDice', rollDice);
app.post('/changeCoinPosition', coinPositionHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`API Server listening on ${PORT}`));
