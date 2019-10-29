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

  resetPlayerCoin(coins, position) {
    const currentPlayer = this.getCurrentPlayer();
    const enemyPlayer = coins.find(
      (coin) => coin.playerId !== currentPlayer.id
    );
    if (enemyPlayer) {
      const player = this.players.find((x) => x.id === enemyPlayer.playerId);
      player.eliminateCoin(position);
    }
  }

  attackPlayer(position) {
    const coins = this.coinsPosition.filter(
      (coin) => coin.position === position
    );
    if (coins.length === 1) {
      this.resetPlayerCoin(coins, position);
    }
  }

  eliminateCoin(position) {
    if (!isSafePosition(position)) {
      this.attackPlayer(position);
    }
  }

  updatePlayerCoinPosition(coinNumber, diceValue) {
    const currentPlayer = this.getCurrentPlayer();
    currentPlayer.setCoinPosition(coinNumber, diceValue);
    const updatedPosition = currentPlayer.getCoinPosition(coinNumber);

    this.eliminateCoin(updatedPosition);
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
    this.rolledValues.push(diceValue);
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
    if (currentPlayer.hasWon) {
      this.updateTurn();
    }
  }

  updateTurn() {
    const nextPlayerIndex = this.currentPlayerIndex + 1;
    this.currentPlayerIndex = nextPlayerIndex % this.numberOfPlayers;
    this.rolledValues = [];
    this.startRollDicePhase();
    this.checkCurrentPlayerWon();
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
