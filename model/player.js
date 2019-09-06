const CoinSet = require('./coinSet');

class Player {
  constructor(id, name, color) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.coins = new CoinSet(color);
  }
}

module.exports = Player;
