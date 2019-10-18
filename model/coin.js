class Coin {
  constructor(number) {
    this.number = number;
    this.position = 0;
  }

  setPosition(position) {
    this.position = position;
  }

  moveCoin(nextPosition) {
    this.position = nextPosition;
  }
}

module.exports = Coin;
