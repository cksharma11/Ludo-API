const { routes } = require('../../config/route');

const getCurrentGame = (req, gameId = req.body.gameId) =>
  req.app.games.getGame(gameId);

const getCoinPositionIndex = (color, position) => {
  const selectedRoute = routes[color];
  return selectedRoute.findIndex((x) => x === position);
};

const getRouteNewValue = (color, index) => routes[color][index];

const getRouteFirstValue = (color) => routes[color][0];

const isValidCoinPosition = (coinNumber, diceValue) => {
  const selectedCoin = this.coins.coins.find((x) => x.number === +coinNumber);
  const { position } = selectedCoin;
  if (!position && diceValue !== 6) {
    return false;
  }
  const selectedCoinPositionIndex = getCoinPositionIndex(this.color, position);
  const newPositionIndex = diceValue + selectedCoinPositionIndex;
  const newPosition = getRouteNewValue(this.color, newPositionIndex);

  return !!newPosition;
};

module.exports = {
  getCurrentGame,
  getCoinPositionIndex,
  getRouteNewValue,
  getRouteFirstValue,
  isValidCoinPosition
};
