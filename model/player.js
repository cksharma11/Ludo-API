const { isNewPositionValid } = require('../src/util/util');

const { WINNING_POSITION } = require('../src/util/constant');

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
    this.canPlay = true;
    this.hasWon = false;
  }

  hasPlayableCoins(diceValue) {
    return this.coins.coins.some((coin) =>
      isNewPositionValid({
        diceValue,
        position: coin.position,
        color: this.color
      })
    );
  }

  updateWinningStatus() {
    const won = this.coins.coins.every(
      (coin) => coin.position === WINNING_POSITION
    );
    if (won) {
      this.hasWon = true;
      this.canPlay = false;
    }
  }

  canMoveCoin(diceValue) {
    const hasOpenCoin = this.coins.coins.some((coin) => coin.position > 0);
    return hasOpenCoin && this.hasPlayableCoins(diceValue);
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

  setCoinPosition(coinNumber, diceValue) {
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
      this.updateWinningStatus();
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
