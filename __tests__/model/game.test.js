const Game = require('../../model/game');

describe('Game', () => {
  it('should update turn', () => {
    const game = new Game(1, 4);
    game.updateTurn();
    expect(game.currentPlayerIndex).toBe(1);
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

  describe('rollDice', () => {
    // As it's Math.ceil(Math.random() * 6), so 3*6 = 18
    // As it's Math.ceil(Math.random() * 6), so 3*6 = 18
    it('should not update the phase if rolled value is 6', () => {
      const game = new Game(1, 4);
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 1;
      global.Math = mockMath;
      expect(game.phase).toBe(0);

      game.rollDice();

      expect(game.phase).toBe(0);
    });

    it('shold update the phase if rolled value is not 6', () => {
      const game = new Game(1, 4);
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.5;
      global.Math = mockMath;
      expect(game.phase).toBe(0);

      game.rollDice();

      expect(game.phase).toBe(1);
    });
  });

  describe('changeCurrentPlayerCoinPosition', () => {
    xit('should update coin position if validCoinPosition', () => {
      const game = new Game(1, 4);
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.5;
      global.Math = mockMath;

      game.changeCurrentPlayerCoinPosition(1);
      expect(game.players[0].coins.coins[1].position).toBe(3);
    });
  });
});
