const axios = require('axios');
const { getGameData } = require('../../src/gameHandler');
const httpService = require('../../src/httpService');

jest.mock('axios');
jest.mock('../../src/httpService');

describe('handlers', () => {
  let req;
  let res;
  beforeEach(() => {
    req = {
      headers: {},
      body: {}
    };
    res = {
      send: jest.fn()
    };

    axios.post.mockReset();
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: { results: {} }
      })
    );
  });

  it('should call getGameData with correct args', async () => {
    req.body = { gameId: 1 };

    httpService.makeCall.mockImplementation(() =>
      Promise.resolve({
        data: {
          joinedPlayers: [
            {
              playerName: 'DummyName',
              playerId: 'DummyId',
              coins: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
              },
              color: 'red'
            }
          ]
        }
      })
    );

    const responseData = {
      currentPlayerId: 'DummyId',
      gameId: 1,
      players: [
        {
          coins: { '1': 0, '2': 0, '3': 0, '4': 0 },
          color: 'red',
          playerId: 'DummyId',
          playerName: 'DummyName'
        }
      ],
      turn: 0
    };

    await getGameData(req, res);

    expect(httpService.makeCall).toHaveBeenCalledTimes(1);
    expect(httpService.makeCall).toHaveBeenCalledWith(
      { gameId: 1 },
      '/players'
    );
    expect(res.send).toHaveBeenCalledWith(responseData);
  });
});
