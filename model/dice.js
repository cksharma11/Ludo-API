class Dice {
  constructor() {
    this.value = 1;
  }

  rollDice() {
    this.value = Math.floor(Math.random() * 6);
  }
}

module.exports = Dice;
