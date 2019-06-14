const axios = require("axios");

const registerGame = async (hostName, numberOfPlayers) => {
  return axios
    .post("http://localhost:3030/createGame", {
      hostName,
      numberOfPlayers
    })
    .then(res => res);
};

const createGame = async (req, res) => {
  const hostName = "host";
  const numberOfPlayers = 4;

  const response = await registerGame(hostName, numberOfPlayers);
  res.send(response.data);
};

module.exports = {
  createGame
};
