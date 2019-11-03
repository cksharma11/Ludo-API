const axios = require('axios');

const { DB_PORT = 5050 } = process.env;

const DB_HOST = process.env.DB_URL || `http://localhost:${DB_PORT}`;
// eslint-disable-next-line no-console
console.log('DEBUGGING ON REMOTE : ', DB_HOST);

const makeCall = async (body, path) => {
  return axios.post(`${DB_HOST}${path}`, { ...body }).then((res) => res);
};

module.exports = { makeCall };
