const CoinSet = require('./coinSet');
const {
  getCoinPositionIndex,
  getRouteNewValue,
  getRouteFirstValue
} = require('../src/util/util');

class Player {
  constructor(id, name, color) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.coins = new CoinSet();
  }

  eliminateCoin(coinPosition) {
    const coin = this.coins.coins.find((x) => x.position === coinPosition);
    coin.setPosition(0);
  }

  hasActiveCoin() {
    return !!this.coins.getActiveCoins().length;
  }

  setCoins(coins) {
    this.coins = coins;
  }

  setCoinPosition(coinNumber, diceValue = 2) {
    const selectedCoin = this.coins.coins.find((x) => x.number === +coinNumber);
    const { position } = selectedCoin;
    if (position) {
      const selectedCoinPositionIndex = getCoinPositionIndex(
        this.color,
        position
      );

      const newPositionIndex = diceValue + selectedCoinPositionIndex;
      const newPosition = getRouteNewValue(this.color, newPositionIndex);
      selectedCoin.setPosition(newPosition);
    } else if (diceValue === 6) {
      const firstValue = getRouteFirstValue(this.color);
      selectedCoin.setPosition(firstValue);
    }
  }

  getCoinPosition(coinNumber) {
    const coin = this.coins.coins.find((x) => x.number === coinNumber);
    return coin.getPosition();
  }
}

module.exports = Player;
