const Game = require('../../model/game');
const Player = require('../../model/player');
const Coin = require('../../model/coin');
const CoinSet = require('../../model/coinSet');
const { makeCall } = require('../httpService');

const mapToGameClass = (args) => {
  const {
    gameId,
    numberofPlayers,
    status,
    diceValue,
    currentPlayerIndex
  } = args;

  const gameObject = new Game(gameId, numberofPlayers);
  gameObject.setStatus(status);
  gameObject.setDiceValue(diceValue);
  gameObject.setCurrentPlayerIndex(currentPlayerIndex);
  return gameObject;
};

const mapToPlayerClass = (args) =>
  args.map((arg) => {
    const { playerId, playerName, color } = arg;
    return new Player(playerId, playerName, color);
  });

const mapToCoinClass = (args) =>
  args.map((arg) => {
    const { coinNumber, coinPosition } = arg;
    const coinObject = new Coin(coinNumber);
    coinObject.setPosition(coinPosition);
    return coinObject;
  });

const mapToCoinSetClass = (args) => {
  const coinSetObject = new CoinSet();
  const coins = mapToCoinClass(args);
  coinSetObject.setCoins(coins);
  return coinSetObject;
};

const mapGameData = async (gameId, gameData) => {
  const game = mapToGameClass(gameData);
  const { data: playersData } = await makeCall({ gameId }, '/load/players');
  const players = mapToPlayerClass(playersData);

  const mappedPlayers = await Promise.all(
    players.map(async (player) => {
      const { data: coinsData } = await makeCall(
        { gameId, playerId: player.id },
        '/load/coins'
      );
      const coinSet = mapToCoinSetClass(coinsData);
      player.setCoins(coinSet);
      return player;
    })
  );
  game.setPlayers(mappedPlayers);
  return game;
};

module.exports = {
  mapGameData
};
