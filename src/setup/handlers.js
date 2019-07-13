const { makeCall } = require('../httpService');

const createGame = async (req, res) => {
  const { hostName, numberOfPlayers } = req.body;
  const response = await makeCall({ hostName, numberOfPlayers }, '/createGame');
  res.send(response.data);
};

const getPlayers = async (req, res) => {
  const { gameId } = req.body;
  const response = await makeCall({ gameId }, '/players');
  res.send(response.data);
};

const joinGame = async (req, res) => {
  const { playerName, gameId } = req.body;
  const response = await makeCall({ playerName, gameId }, '/joinGame');
  res.send(response.data);
};

module.exports = {
  createGame,
  getPlayers,
  joinGame
};
