const { getCurrentGame } = require('./util/util');

const getGameData = async (req, res) => {
  const currentGame = getCurrentGame(req);
  res.send(currentGame);
};

module.exports = {
  getGameData
};
