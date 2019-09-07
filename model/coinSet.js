const Coin = require('./coin');

class CoinSet {
  constructor(color) {
    this.color = color;
    this.coins = [];
  }

  createSet() {
    this.coins.push(new Coin(this.color));
    this.coins.push(new Coin(this.color));
    this.coins.push(new Coin(this.color));
    this.coins.push(new Coin(this.color));
  }
}

module.exports = CoinSet;
