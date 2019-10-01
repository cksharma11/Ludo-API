const { makeCall } = require('../httpService');
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
  res.send(JSON.parse(JSON.stringify(currentGame)));
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
  // const { gameId, playerId } = req.body;
  // const response = await makeCall({ gameId }, '/loadGame');
  res.end();
};

const saveGame = async (req, res) => {
  const currentGame = req.body; // getCurrentGame(req);
  const { currentPlayerIndex, diceValue, id: gameId, players } = currentGame;
  await makeCall({ currentPlayerIndex, diceValue, gameId }, '/save/game');

  players.forEach(async (player) => {
    const { coins, id: playerId } = player;
    coins.forEach(async (coin) => {
      const { number, position } = coin;
      await makeCall({ number, position, playerId, gameId }, '/save/coins');
    });
  });
  res.end();
};

module.exports = {
  createGame,
  getPlayers,
  joinGame,
  loadGame,
  saveGame
};
