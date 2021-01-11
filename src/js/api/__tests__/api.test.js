import fetch from 'node-fetch';
import getPokemon from '../api.js';
import server from '../../../mocks/server.js';

beforeAll(() => {
  global.fetch = fetch;
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('getPokemon', () => {
  it('returns an object when passed a valid id/name', async () => {
    await expect(getPokemon(1)).resolves.toBeInstanceOf(Object);
  });

  it('Throws an exception when passed an invalid id/name', async () => {
    await expect(getPokemon(3245)).rejects.toThrowError(
      'Sorry, something went wrong! Try again in a few minutes!.'
    );
  });
});
