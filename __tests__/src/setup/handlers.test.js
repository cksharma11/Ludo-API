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
      body: { hostName: 'testname', numberOfPlayers: 2 }
    };
    res = {
      send: () => responseData
    };
  });

  it('should call createGame with correct args', async () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: { results: {} }
      })
    );

    await createGame(req, res);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5050/createGame',
      { hostName: 'testname', numberOfPlayers: 2 }
    );
  });

  it('should call joinGame with correct args', async () => {
    axios.post.mockReset();
    req.body = {
      playerName: 'testname',
      gameId: 1
    };

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: { results: {} }
      })
    );

    await joinGame(req, res);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5050/joinGame', {
      playerName: 'testname',
      gameId: 1
    });
  });

  it('should call getPlayers with correct args', async () => {
    axios.post.mockReset();
    req.body = {
      gameId: 11
    };

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: { results: {} }
      })
    );

    await getPlayers(req, res);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5050/players', {
      gameId: 11
    });
  });
});
