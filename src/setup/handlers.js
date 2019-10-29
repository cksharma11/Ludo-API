const { makeCall } = require('../httpService');
const { mapGameData } = require('../map/objectMapper');
const Game = require('../../model/game');
const Player = require('../../model/player');
const { getCurrentGame } = require('../util/util');

const createGame = async (req, res) => {
  const { hostName, numberOfPlayers } = req.body;
  const response = await makeCall({ hostName, numberOfPlayers }, '/createGame');
  const {
    gameId,
    numberOfPlayers: playersCount,
    playerId,
    color
  } = response.data;

  req.app.games.addGame(new Game(gameId, playersCount));
  const currentGame = getCurrentGame(req, gameId);
  currentGame.addPlayer(new Player(playerId, hostName, color));
  res.send(JSON.stringify({ gameId, playerId }));
};

const getPlayers = async (req, res) => {
  const currentGame = getCurrentGame(req);
  if (currentGame) {
    res.send(JSON.parse(JSON.stringify(currentGame)));
    return;
  }
  res.send({});
};

const joinGame = async (req, res) => {
  const currentGame = getCurrentGame(req);
  const { playerName, gameId } = req.body;
  const response = await makeCall({ playerName, gameId }, '/joinGame');
  const { playerId, color } = response.data;
  currentGame.addPlayer(new Player(playerId, playerName, color));
  res.send(JSON.stringify(response.data));
};

const loadGame = async (req, res) => {
  const { gameId } = req.body;
  const { data: gameData } = await makeCall({ gameId }, '/load/game');
  if (!gameData.length) {
    res.send(JSON.stringify({ error: 'NOT FOUND' }));
    return;
  }
  const game = await mapGameData(gameId, gameData[0]);
  req.app.games.addGame(game);
  res.send(game);
};

const saveGame = async (req, res) => {
  const currentGame = getCurrentGame(req);
  const { logs } = currentGame.activityLog;
  const { currentPlayerIndex, diceValue, id: gameId, players } = currentGame;
  await makeCall({ currentPlayerIndex, diceValue, gameId }, '/save/game');

  players.forEach(async (player) => {
    const { coins, id: playerId } = player;
    const { coins: coinSet } = coins;
    coinSet.forEach(async (coin) => {
      const { number, position } = coin;
      await makeCall({ number, position, playerId, gameId }, '/save/coins');
    });
  });
  await makeCall({ logs, gameId }, '/save/activityLog');
  res.send({});
};

module.exports = {
  createGame,
  getPlayers,
  joinGame,
  loadGame,
  saveGame
};
