const axios = require('axios');
const {
  createGame,
  joinGame,
  getPlayers
} = require('../../../src/setup/handlers');

jest.mock('axios');

describe('handlers', () => {
  let req;
  let res;
  let responseData;
  beforeEach(() => {
    responseData = {};
    req = {
      headers: {},
      body: {}
    };
    res = {
      send: () => responseData
    };

    axios.post.mockReset();
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: { results: {} }
      })
    );
  });

  it('should call createGame with correct args', async () => {
    req.body = { hostName: 'testname', numberOfPlayers: 2 };
    await createGame(req, res);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5050/createGame',
      { hostName: 'testname', numberOfPlayers: 2 }
    );
  });

  it('should call joinGame with correct args', async () => {
    req.body = { playerName: 'testname', gameId: 1 };
    await joinGame(req, res);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5050/joinGame', {
      playerName: 'testname',
      gameId: 1
    });
  });

  it('should call getPlayers with correct args', async () => {
    req.body = { gameId: 11 };
    await getPlayers(req, res);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5050/players', {
      gameId: 11
    });
  });
});
