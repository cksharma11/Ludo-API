const { makeCall } = require('./httpService');

const getCurrentPlayerId = (players, turn) => players[turn].playerId;

const getGameData = async (req, res) => {
  const { gameId } = req.body;
  const response = await makeCall({ gameId }, '/players');
  const { joinedPlayers: players } = response.data;
  const turn = 0;
  const currentPlayerId = getCurrentPlayerId(players, turn);
  const game = {
    gameId,
    players,
    currentPlayerId,
    turn
  };
  res.send(game);
};

module.exports = {
  getGameData
};
