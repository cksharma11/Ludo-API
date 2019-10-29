const { routes } = require('../../config/route');

const getCurrentGame = (req, gameId = req.body.gameId) =>
  req.app.games.getGame(gameId);

const getCoinPositionIndex = (color, position) => {
  const selectedRoute = routes[color];
  return selectedRoute.findIndex((x) => x === position);
};

const getRouteNewValue = (color, index) => routes[color][index];

const getRouteFirstValue = (color) => routes[color][0];

const isNewPositionValid = ({ color, position, diceValue }) => {
  const selectedCoinPositionIndex = getCoinPositionIndex(color, position);
  if (selectedCoinPositionIndex === 0 && diceValue !== 6) {
    return false;
  }
  const newPositionIndex = diceValue + selectedCoinPositionIndex;
  const newPosition = getRouteNewValue(color, newPositionIndex);
  return !!newPosition;
};

const isValidCoinPosition = ({ coinNumber, diceValue, coins, color }) => {
  const selectedCoin = coins.find((x) => x.number === +coinNumber);
  const { position } = selectedCoin;
  if (!position && diceValue !== 6) {
    return false;
  }
  return !!isNewPositionValid({ color, position, diceValue });
};

const isSafePosition = (position) => routes.safe.includes(position);

module.exports = {
  getCurrentGame,
  getCoinPositionIndex,
  getRouteNewValue,
  getRouteFirstValue,
  isValidCoinPosition,
  isSafePosition,
  isNewPositionValid
};
