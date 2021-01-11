import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import init from '../pokedex.js';
import server from '../../mocks/server.js';
import pokedexBody from '../../mocks/fixtures/indexHtml.js';
import pokemonMapper from '../mappers/mapper.js';
import setPaginator from '../ui/paginator.js';
import setSearcher from '../ui/searcher.js';

jest.mock('../ui/paginator.js');
jest.mock('../ui/searcher.js');

beforeAll(() => {
  document.body.innerHTML = pokedexBody;
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('init', () => {
  it('Initializes pokedex', async () => {
    global.fetch = fetch;
    global.localStorage.clear();

    const bulbasaurData = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../../mocks/fixtures/bulbasaur.json'), 'utf-8')
    );
    const bulbasaur = pokemonMapper(bulbasaurData);

    await init();

    const pokemonId = document.querySelector('#id').textContent;
    const pokemonName = document.querySelector('#name').textContent;

    expect(Number(pokemonId)).toBe(bulbasaur.id);
    expect(pokemonName).toBe(bulbasaur.name);

    expect(setPaginator).toHaveBeenCalledTimes(1);
    expect(setPaginator).toHaveBeenCalledWith(expect.any(Function));
    expect(setSearcher).toHaveBeenCalledTimes(1);
    expect(setSearcher).toHaveBeenCalledWith(expect.any(Function));
  });

  it('Shows a modal when loading fails', async () => {
    server.close();
    global.localStorage.clear();
    global.fetch = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });

    await init();

    const $modal = document.querySelector('#modal');
    const modalMessage = document.querySelector('#modal-text');
    const modalImage = document.querySelector('#modal-img');

    expect($modal.style.display).toBe('block');
    expect(modalMessage).toBeDefined();
    expect(modalImage).toBeDefined();
  });
});
