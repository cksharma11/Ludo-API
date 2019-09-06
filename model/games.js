class Games {
  constructor() {
    this.games = {};
  }

  addGame(game) {
    this.games[game.id] = game;
  }

  getGame(gameId) {
    return this.games[gameId];
  }
}

module.exports = Games;
