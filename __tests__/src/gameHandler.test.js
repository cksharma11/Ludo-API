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
      app: {
        games: {
          1: {
            players: [],
            order: [],
            currentPlayerIndex: 0,
            addPlayer: jest.fn()
          },
          11: {
            players: [],
            order: [],
            currentPlayerIndex: 0,
            addPlayer: jest.fn()
          },
          addGame: jest.fn(),
          getGame: () => {
            return {
              players: [],
              order: [],
              currentPlayerIndex: 0,
              addPlayer: jest.fn()
            };
          }
        }
      },
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
      currentPlayerIndex: 0,
      order: [],
      players: []
    };

    await getGameData(req, res);

    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining(responseData)
    );
  });
});
