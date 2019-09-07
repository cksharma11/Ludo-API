const axios = require('axios');

const { DB_PORT = 5050 } = process.env;

const DB_HOST = process.env.DB_HOST || `http://localhost:${DB_PORT}`;

const makeCall = async (body, path) => {
  return axios.post(`${DB_HOST}${path}`, { ...body }).then((res) => res);
};

module.exports = { makeCall };
