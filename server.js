const fastify = require('fastify')({ logger: true });

const PORT = process.env.API_PORT || 8080;

const { createGame } = require('./src/setup/createGame');

fastify.get('/', (req, res) => {
  res.send('Hello!');
});

fastify.post('/createGame', createGame);

const start = () => {
  fastify.listen(PORT);
  fastify.log.info(`Server listening on ${PORT}`);
};

start();
