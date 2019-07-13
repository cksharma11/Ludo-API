const fastify = require('fastify')();

const PORT = process.env.API_PORT;

const { createGame, getPlayers, joinGame } = require('./src/setup/handlers');

const { getGameData } = require('./src/gameHandler');

fastify.register(require('fastify-cors'));

fastify.get('/', (req, res) => {
  res.send('Hello API!');
});

fastify.post('/createGame', createGame);
fastify.post('/players', getPlayers);
fastify.post('/joinGame', joinGame);
fastify.post('/getGameData', getGameData);

const start = () => {
  fastify.listen(PORT, '0.0.0.0');
  fastify.log.info(`API Server listening on ${PORT}`);
};

start();
