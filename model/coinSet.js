const Coin = require('./coin');

class CoinSet {
  constructor(color) {
    this.color = color;
    this.coins = [];
  }

  createSet() {
    this.coins.push(new Coin(1));
    this.coins.push(new Coin(2));
    this.coins.push(new Coin(3));
    this.coins.push(new Coin(4));
    return this.coins;
  }
}

module.exports = CoinSet;
