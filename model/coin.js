class Coin {
  constructor(color) {
    this.color = color;
    this.position = 0;
  }

  moveCoin(nextPosition) {
    this.position = nextPosition;
  }
}

exports.Coin = Coin;
