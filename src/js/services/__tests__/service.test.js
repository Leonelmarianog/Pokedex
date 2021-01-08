import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import getPokemonByIdOrName from '../service.js';
import server from '../../../mocks/server.js';
import Pokemon from '../../entities/Pokemon.js';

beforeAll(() => {
  global.fetch = fetch;
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  global.localStorage.clear();
});

afterAll(() => {
  server.close();
});

describe('getPokemonByIdOrName', () => {
  it('Returns a specific pokemon from the API when it is not stored in local storage', async () => {
    const pokemon = await getPokemonByIdOrName(25);

    expect(pokemon).toBeInstanceOf(Pokemon);
  });

  it('Returns a specific pokemon from localStorage if it is already stored', async () => {
    const pokemonData = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../../../mocks/fixtures/pikachu.json'), 'utf-8')
    );

    global.localStorage.setItem(`${pokemonData.id}`, JSON.stringify(pokemonData));

    const pokemon = await getPokemonByIdOrName(25);

    expect(pokemon).toBeInstanceOf(Pokemon);
  });
});
