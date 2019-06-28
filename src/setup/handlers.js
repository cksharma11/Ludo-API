const axios = require('axios');

const { DB_PORT } = process.env;

const makeCall = async (body, path) => {
  return axios
    .post(`http://localhost:${DB_PORT}${path}`, {
      ...body
    })
    .then((res) => res);
};

const createGame = async (req, res) => {
  const { hostName } = req.body;
  const { numberOfPlayers } = req.body;

  const response = await makeCall({ hostName, numberOfPlayers }, '/createGame');
  res.send(response.data);
};

const getPlayers = async (req, res) => {
  const { gameId } = req.body;
  const response = await makeCall({ gameId }, '/players');
  res.send(response.data);
};

module.exports = {
  createGame,
  getPlayers
};
