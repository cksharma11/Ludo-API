const { getCurrentGame } = require('./util/util');
const { PHASE } = require('./util/constant');

const getCoinDetail = ({ coin, player, isCurrentPlayer }) => {
  const { number: id, position, isPlayable } = coin;
  return {
    color: player.color,
    playerId: player.id,
    position,
    id,
    isPlayable: isCurrentPlayer ? isPlayable : false
  };
};
const getCoinsPosition = (currentGame) => {
  const coinsPosition = [];
  const diceValue = currentGame.rolledValues[0];
  currentGame.players.forEach((player) => {
    const coinsStatus = player.getCoinsStatus(diceValue);
    const currentPlayer = currentGame.getCurrentPlayer();
    const isCurrentPlayer = currentPlayer.id === player.id;
    coinsStatus.forEach((coin) => {
      coinsPosition.push(getCoinDetail({ coin, player, isCurrentPlayer }));
    });
  });
  return coinsPosition;
};

const getGameData = (req, res) => {
  const currentGame = getCurrentGame(req);
  currentGame.coinsPosition = getCoinsPosition(currentGame);
  currentGame.winningPlayer = currentGame.getWinningPlayer();
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
  const { id, color } = req.body;
  if (currentGame.phase === PHASE.PLACE_COIN) {
    const currentPlayer = currentGame.getCurrentPlayer();
    if (currentPlayer.color === color) {
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
