class Coin {
  constructor(number) {
    this.number = number;
    this.position = 0;
  }

  moveCoin(nextPosition) {
    this.position = nextPosition;
  }
}

module.exports = Coin;
