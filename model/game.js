class Game {
  constructor(id, numberOfPlayers) {
    this.players = [];
    this.order = [];
    this.numberOfPlayers = +numberOfPlayers;
    this.id = id;
    this.currentPlayerIndex = 0;
    this.isStarted = false;
    this.diceValue = 1;
  }

  updateTurn() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.numberOfPlayers;
  }

  isDiceRolledSix() {
    return this.diceValue === 6;
  }

  rollDice() {
    this.diceValue = Math.ceil(Math.random() * 6);
    if (!this.isDiceRolledSix()) {
      this.updateTurn();
    }
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
