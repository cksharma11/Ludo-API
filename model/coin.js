class Coin {
  constructor(color) {
    this.color = color;
    this.position = 0;
  }

  moveCoin(nextPosition) {
    this.position = nextPosition;
  }
}

module.exports = Coin;
