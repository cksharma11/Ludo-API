const { getCurrentTime } = require('../src/util/util');

const { COUNT_POSTFIX } = require('../src/util/constant');

class ActivityLog {
  constructor() {
    this.id = 0;
    this.logs = [];
    this.time = '';
  }

  updateId() {
    this.id = this.id + 1;
    this.time = getCurrentTime();
  }

  addMessage(message) {
    this.updateId();
    this.logs.unshift({ id: this.id, message, time: this.time });
  }

  getLatestLog() {
    return this.logs[0];
  }

  rollDice(playerName, diceValue) {
    const message = `${playerName} has rolled ${diceValue}!`;
    this.addMessage(message);
  }

  placeCoin(playerName) {
    const message = `${playerName} has moved a coin!`;
    this.addMessage(message);
  }

  changeTurn(playerName) {
    const message = `${playerName}, its your turn!`;
    this.addMessage(message);
  }

  attack(attacker, defender) {
    const message = `${attacker} killed a coin of ${defender}`;
    this.addMessage(message);
  }

  reachedHome(playerName, numberOfCoins) {
    const postfix = COUNT_POSTFIX[numberOfCoins];
    const message = `${playerName}'s ${numberOfCoins}${postfix} coin reached HOME!`;
    this.addMessage(message);
  }
}

module.exports = ActivityLog;
