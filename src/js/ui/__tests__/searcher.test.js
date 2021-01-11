import setSearcher from '../searcher.js';
import pokedexBody from '../../../mocks/fixtures/indexHtml.js';

beforeAll(() => {
  document.body.innerHTML = pokedexBody;
});

afterEach(() => jest.restoreAllMocks());

describe('searcher', () => {
  it('Loads a specific pokemon', () => {
    const $input = document.querySelector('#pokemon-input');
    $input.value = 'pikachu';
    const userInput = $input.value;
    const $searchBtn = document.querySelector('#btn-search');

    const searchBtnListenerSpy = jest.spyOn($searchBtn, 'addEventListener');

    searchBtnListenerSpy.mockImplementationOnce((event, callback) => {
      callback();
    });

    const loadPokemonMock = jest.fn();

    setSearcher(loadPokemonMock);

    expect(loadPokemonMock).toHaveBeenCalledTimes(1);
    expect(loadPokemonMock).toHaveBeenCalledWith(userInput);
  });

  it('Shows a modal if validation fails', () => {
    const $input = document.querySelector('#pokemon-input');
    $input.value = '';
    const $searchBtn = document.querySelector('#btn-search');
    const $modal = document.querySelector('#modal');
    const $modalMessage = document.querySelector('#modal-text').textContent;
    const $modalImage = document.querySelector('#modal-img').src;

    const searchBtnListenerSpy = jest.spyOn($searchBtn, 'addEventListener');

    searchBtnListenerSpy.mockImplementationOnce((event, callback) => {
      callback();
    });

    const loadPokemonMock = jest.fn();

    setSearcher(loadPokemonMock);

    expect(loadPokemonMock).toHaveBeenCalledTimes(0);
    expect($modal.style.display).toBe('block');
    expect($modalMessage).toBeDefined();
    expect($modalImage).toBeDefined();
  });
});
