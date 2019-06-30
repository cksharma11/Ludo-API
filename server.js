const fastify = require('fastify')({ logger: true });

const PORT = process.env.API_PORT;

const { createGame, getPlayers } = require('./src/setup/handlers');

fastify.register(require('fastify-cors'));

fastify.get('/', (req, res) => {
  res.send('Hello!');
});

fastify.post('/createGame', createGame);
fastify.post('/players', getPlayers);

const start = () => {
  fastify.listen(PORT);
  fastify.log.info(`API Server listening on ${PORT}`);
};

start();
