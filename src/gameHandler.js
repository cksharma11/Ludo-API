const { getCurrentGame } = require('./util/util');
const { PHASE } = require('./util/constant');

const getCoinsPosition = (currentGame) => {
  const coinsPosition = [];
  currentGame.players.forEach((player) => {
    player.coins.coins.forEach((coin) => {
      const { number, position } = coin;
      coinsPosition.push({
        color: player.color,
        position,
        id: number,
        playerId: player.id
      });
    });
  });
  return coinsPosition;
};

const getGameData = (req, res) => {
  const currentGame = getCurrentGame(req);
  currentGame.coinsPosition = getCoinsPosition(currentGame);
  res.send(currentGame);
};

const rollDice = (req, res) => {
  const currentGame = getCurrentGame(req);
  if (currentGame.phase === PHASE.ROLL_DICE) {
    currentGame.rollDice();
  }
  res.send({});
};

const coinPositionHandler = (req, res) => {
  const currentGame = getCurrentGame(req);
  const { id, playerId } = req.body;
  if (currentGame.phase === PHASE.PLACE_COIN) {
    const currentPlayer = currentGame.getCurrentPlayer();
    if (currentPlayer.id === +playerId) {
      currentGame.changeCurrentPlayerCoinPosition(id);
    }
  }
  res.send({});
};

module.exports = {
  getGameData,
  rollDice,
  coinPositionHandler
};
