const axios = require('axios');

const { DB_PORT = 5050 } = process.env;

const makeCall = async (body, path) => {
  return axios
    .post(`http://localhost:${DB_PORT}${path}`, {
      ...body
    })
    .then((res) => res);
};

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
