const { getCurrentGame } = require('./util/util');

const getGameData = (req, res) => {
  const currentGame = getCurrentGame(req);
  res.send(currentGame);
};

const rollDice = (req, res) => {
  const currentGame = getCurrentGame(req);
  currentGame.rollDice();
  res.send({});
};

module.exports = {
  getGameData,
  rollDice
};
