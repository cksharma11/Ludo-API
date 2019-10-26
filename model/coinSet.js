const Coin = require('./coin');

class CoinSet {
  constructor() {
    this.coins = [new Coin(1), new Coin(2), new Coin(3), new Coin(4)];
  }

  setCoins(coins) {
    this.coins = coins;
  }

  getActiveCoins() {
    return this.coins.filter((coin) => coin.position);
  }
}

module.exports = CoinSet;
