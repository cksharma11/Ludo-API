const { isValidCoinPosition } = require('../src/util/util');

class Game {
  constructor(id, numberOfPlayers) {
    this.players = [];
    this.order = [];
    this.numberOfPlayers = +numberOfPlayers;
    this.id = id;
    this.status = false;
    this.currentPlayerIndex = 0;
    this.isStarted = false;
    this.diceValue = 1;
    this.rolledValues = [];
    this.coinsPosition = [];
    this.phase = 0;
  }

  eliminateCoin(currentPlayer, position) {
    const coins = this.coinsPosition.filter(
      (coin) => coin.position === position
    );
    if (coins.length === 1) {
      const enemyPlayer = coins.find(
        (coin) => coin.playerId !== currentPlayer.id
      );
      if (enemyPlayer) {
        const player = this.players.find((x) => x.id === enemyPlayer.playerId);
        player.eliminateCoin(position);
      }
    }
  }

  changeCurrentPlayerCoinPosition(coinNumber) {
    const currentPlayer = this.getCurrentPlayer();
    const coinPosition = this.rolledValues.shift();
    if (isValidCoinPosition(coinNumber, coinPosition)) {
      currentPlayer.setCoinPosition(coinNumber, coinPosition);
      const updatedPosition = currentPlayer.getCoinPosition(coinNumber);
      this.eliminateCoin(currentPlayer, updatedPosition);
      if (!this.rolledValues.length) {
        this.updateTurn();
        this.phase = 0;
      }
    } else {
      this.rolledValues.push(coinPosition);
    }
  }

  setCurrentPlayerIndex(currentPlayerIndex) {
    this.currentPlayerIndex = currentPlayerIndex;
  }

  setDiceValue(diceValue) {
    this.diceValue = diceValue;
  }

  setStatus(status) {
    this.status = status;
  }

  startGame() {
    this.isStarted = true;
  }

  setPlayers(players) {
    this.players = players;
  }

  updateTurn() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.numberOfPlayers;
  }

  isDiceRolledSix() {
    return this.diceValue === 6;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  rollDice() {
    this.diceValue = Math.ceil(Math.random() * 6);
    if (this.isDiceRolledSix()) {
      this.rolledValues.push(this.diceValue);
    } else {
      this.rolledValues.push(this.diceValue);
      this.phase = 1 - this.phase;
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
