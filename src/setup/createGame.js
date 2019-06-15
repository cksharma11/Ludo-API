const axios = require('axios');

const { DB_PORT = 3030 } = process.env;

const registerGame = async (hostName, numberOfPlayers) => {
  return axios
    .post(`http://localhost:${DB_PORT}/createGame`, {
      hostName,
      numberOfPlayers
    })
    .then((res) => res);
};

const createGame = async (req, res) => {
  const { hostName } = req.body;
  const { numberOfPlayers } = req.body;

  const response = await registerGame(hostName, numberOfPlayers);
  res.send(response.data);
};

module.exports = {
  createGame
};
