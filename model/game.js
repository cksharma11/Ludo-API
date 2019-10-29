const { isValidCoinPosition, isSafePosition } = require('../src/util/util');
const { PHASE } = require('../src/util/constant');

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

  getWinningPlayer() {
    return this.players.find((player) => !player.canPlay);
  }

  startRollDicePhase() {
    this.phase = PHASE.ROLL_DICE;
  }

  startPlaceCoinPhase() {
    this.phase = PHASE.PLACE_COIN;
  }

  eliminateCoin(currentPlayer, position) {
    if (!isSafePosition(position)) {
      const coins = this.coinsPosition.filter(
        (coin) => coin.position === position
      );
      if (coins.length === 1) {
        const enemyPlayer = coins.find(
          (coin) => coin.playerId !== currentPlayer.id
        );
        if (enemyPlayer) {
          const player = this.players.find(
            (x) => x.id === enemyPlayer.playerId
          );
          player.eliminateCoin(position);
        }
      }
    }
  }

  changeCurrentPlayerCoinPosition(coinNumber) {
    const currentPlayer = this.getCurrentPlayer();
    const diceValue = this.rolledValues.shift();
    if (!diceValue) {
      this.updateTurn();
      return;
    }
    const validCoinPosition = isValidCoinPosition({
      coinNumber,
      diceValue,
      coins: currentPlayer.coins.coins,
      color: currentPlayer.color
    });
    if (validCoinPosition) {
      currentPlayer.setCoinPosition(coinNumber, diceValue);
      const updatedPosition = currentPlayer.getCoinPosition(coinNumber);
      this.eliminateCoin(currentPlayer, updatedPosition);
      if (!this.rolledValues.length) {
        this.updateTurn();
      }
    } else if (!currentPlayer.canMoveCoin(diceValue)) {
      this.changeCurrentPlayerCoinPosition(coinNumber);
    } else {
      this.rolledValues.push(diceValue);
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
    this.rolledValues = [];
    if (this.players[this.currentPlayerIndex].hasWon) {
      this.updateTurn();
    }
    this.startRollDicePhase();
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
      if (JSON.stringify(this.rolledValues) === JSON.stringify([6, 6, 6])) {
        this.updateTurn();
      }
    } else {
      const currentPlayer = this.getCurrentPlayer();
      this.rolledValues.push(this.diceValue);
      this.startPlaceCoinPhase();

      if (
        !currentPlayer.canMoveCoin(this.diceValue) &&
        !this.rolledValues.includes(6)
      ) {
        this.updateTurn();
      }
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
