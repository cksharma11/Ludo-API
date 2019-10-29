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

  getAllCoinsAtPosition(position) {
    return this.coinsPosition.filter((coin) => coin.position === position);
  }

  resetPlayerCoin(position) {
    const currentPlayer = this.getCurrentPlayer();
    const coins = this.getAllCoinsAtPosition(position);
    const enemyPlayer = coins.find(
      (coin) => coin.playerId !== currentPlayer.id
    );
    if (enemyPlayer) {
      const player = this.players.find((x) => x.id === enemyPlayer.playerId);
      player.eliminateCoin(position);
    }
  }

  canAttack(position) {
    const coins = this.getAllCoinsAtPosition(position);
    return coins.length === 1;
  }

  eliminateCoin(position) {
    if (isSafePosition(position)) {
      return false;
    }
    if (this.canAttack(position)) {
      this.resetPlayerCoin(position);
      return true;
    }
    return false;
  }

  isCoinReachedHome(coinNumber) {
    if (this.checkCurrentPlayerWon()) {
      this.updateTurn();
      return true;
    }
    const currentPlayer = this.getCurrentPlayer();
    const position = currentPlayer.getCoinPosition(coinNumber);
    return position === 100;
  }

  updatePlayerCoinPosition(coinNumber, diceValue) {
    const currentPlayer = this.getCurrentPlayer();
    currentPlayer.setCoinPosition(coinNumber, diceValue);
    const updatedPosition = currentPlayer.getCoinPosition(coinNumber);

    const coinEliminated = this.eliminateCoin(updatedPosition);
    const reachedHome = this.isCoinReachedHome(coinNumber);
    if (coinEliminated || reachedHome) {
      this.startRollDicePhase();
      return;
    }

    if (!this.rolledValues.length) {
      this.updateTurn();
    }
  }

  validateCoinPosition(coinNumber, diceValue) {
    const currentPlayer = this.getCurrentPlayer();
    const validCoinPosition = isValidCoinPosition({
      coinNumber,
      diceValue,
      coins: currentPlayer.coins.coins,
      color: currentPlayer.color
    });
    if (validCoinPosition) {
      this.updatePlayerCoinPosition(coinNumber, diceValue);
      return;
    }
    if (!currentPlayer.hasPlayableCoins(diceValue)) {
      this.changeCurrentPlayerCoinPosition(coinNumber);
      return;
    }
    this.rolledValues.unshift(diceValue);
  }

  changeCurrentPlayerCoinPosition(coinNumber) {
    const diceValue = this.rolledValues.shift();
    if (!diceValue) {
      this.updateTurn();
      return;
    }
    this.validateCoinPosition(coinNumber, diceValue);
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

  checkCurrentPlayerWon() {
    const currentPlayer = this.getCurrentPlayer();
    return currentPlayer.hasWon;
  }

  updateTurn() {
    const nextPlayerIndex = this.currentPlayerIndex + 1;
    const nextPlayer = this.players[nextPlayerIndex];
    this.currentPlayerIndex = nextPlayerIndex % this.numberOfPlayers;
    if (nextPlayer.hasWon) {
      this.updateTurn();
    }
    this.rolledValues = [];
    this.startRollDicePhase();
  }

  isDiceRolledSix() {
    return this.diceValue === 6;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  diceRolledSixHandler() {
    if (JSON.stringify(this.rolledValues) === JSON.stringify([6, 6, 6])) {
      this.updateTurn();
    }
  }

  canCurrentPlayerPlay() {
    const currentPlayer = this.getCurrentPlayer();
    return this.rolledValues.some((rolledValue) =>
      currentPlayer.hasPlayableCoins(rolledValue)
    );
  }

  rollDice() {
    this.diceValue = Math.ceil(Math.random() * 6);
    this.rolledValues.push(this.diceValue);

    if (this.isDiceRolledSix()) {
      this.diceRolledSixHandler();
      return;
    }
    const canPlay = this.canCurrentPlayerPlay();
    if (!canPlay) {
      this.updateTurn();
      return;
    }
    this.startPlaceCoinPhase();
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
