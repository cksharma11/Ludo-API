const getCurrentGame = (req, gameId = req.body.gameId) =>
  req.app.games.getGame(gameId);

module.exports = { getCurrentGame };
