const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Games = require('./model/games');

const app = express();

app.games = new Games();

const PORT = process.env.PORT || process.env.API_PORT;

const { createGame, getPlayers, joinGame } = require('./src/setup/handlers');

const { getGameData, rollDice } = require('./src/gameHandler');

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

app.post('/createGame', createGame);
app.post('/players', getPlayers);
app.post('/joinGame', joinGame);
app.post('/getGameData', getGameData);
app.post('/rollDice', rollDice);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`API Server listening on ${PORT}`));
