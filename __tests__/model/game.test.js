const Game = require('../../model/game');

describe('Game', () => {
  it('should update turn', () => {
    const game = new Game(1, 4);
    game.updateTurn();
    expect(game.currentPlayerIndex).toBe(1);
  });

  it('should roll dice and update turn if dice value is other than 6', () => {
    const game = new Game(1, 4);
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 3;
    global.Math = mockMath;
    game.rollDice();
    expect(game.currentPlayerIndex).toBe(1);
    expect(game.diceValue).toBe(18); // As it's Math.ceil(Math.random() * 6), so 3*6 = 18
  });

  it('should roll dice and should not update turn if dice value is than 6', () => {
    const game = new Game(1, 4);
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 1;
    global.Math = mockMath;
    game.rollDice();
    expect(game.currentPlayerIndex).toBe(0);
    expect(game.diceValue).toBe(6); // As it's Math.ceil(Math.random() * 6), so 3*6 = 18
  });

  it('should add player to game', () => {
    const game = new Game(1, 4);
    const player = { name: 'Alex' };
    game.addPlayer(player);

    expect(game.getPlayers()).toHaveLength(1);
  });

  it('should start the game if players count is equals to number of players', () => {
    const game = new Game(1, 2);
    const player = { name: 'Alex' };
    const player2 = { name: 'Bob' };
    game.addPlayer(player);
    game.addPlayer(player2);

    expect(game.isStarted).toBeTruthy();
  });
});
