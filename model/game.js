class Game {
  constructor(id, numberOfPlayers) {
    this.players = [];
    this.order = [];
    this.numberOfPlayers = +numberOfPlayers;
    this.id = id;
    this.currentPlayerIndex = 0;
    this.isStarted = false;
  }

  hasStarted() {
    this.isStarted = this.players.length === this.numberOfPlayers;
  }

  addPlayer(player) {
    this.players.push(player);
    this.hasStarted();
  }

  getPlayers() {
    return this.players;
  }
}

module.exports = Game;
