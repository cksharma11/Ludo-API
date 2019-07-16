const axios = require('axios');

const { DB_PORT = 5050 } = process.env;

const makeCall = async (body, path) => {
  return axios
    .post(`http://localhost:${DB_PORT}${path}`, { ...body })
    .then((res) => res);
};

module.exports = { makeCall };
