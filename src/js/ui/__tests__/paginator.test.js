import setPaginator from '../paginator.js';
import pokedexBody from '../../../mocks/fixtures/indexHtml.js';

beforeAll(() => {
  document.body.innerHTML = pokedexBody;
});

afterEach(() => jest.restoreAllMocks());

describe('paginator', () => {
  it('Loads next pokemon', () => {
    const $currentPokemonId = document.querySelector('#id');
    $currentPokemonId.textContent = '1';
    const nextPokemonId = Number($currentPokemonId.textContent) + 1;
    const $nextBtn = document.querySelector('#btn-next');

    const nextBtnListenerSpy = jest.spyOn($nextBtn, 'addEventListener');

    const eventMock = {
      currentTarget: $nextBtn,
    };

    nextBtnListenerSpy.mockImplementationOnce((event, callback) => {
      callback(eventMock);
    });

    const loadPokemonMock = jest.fn();

    setPaginator(loadPokemonMock);

    expect(loadPokemonMock).toHaveBeenCalledTimes(1);
    expect(loadPokemonMock).toHaveBeenCalledWith(nextPokemonId);
  });

  it('Loads previous pokemon', () => {
    const $currentPokemonId = document.querySelector('#id');
    $currentPokemonId.textContent = '2';
    const nextPokemonId = Number($currentPokemonId.textContent) - 1;
    const $previousBtn = document.querySelector('#btn-previous');

    const previousBtnListenerSpy = jest.spyOn($previousBtn, 'addEventListener');

    const eventMock = {
      currentTarget: document.querySelector('#btn-previous'),
    };

    previousBtnListenerSpy.mockImplementationOnce((event, callback) => {
      callback(eventMock);
    });

    const loadPokemonMock = jest.fn();

    setPaginator(loadPokemonMock);

    expect(loadPokemonMock).toHaveBeenCalledTimes(1);
    expect(loadPokemonMock).toHaveBeenCalledWith(nextPokemonId);
  });

  it('Loads first pokemon when moving over last pokemon', () => {
    const $currentPokemonId = document.querySelector('#id');
    $currentPokemonId.textContent = '898';
    const nextPokemonId = 1;
    const $nextBtn = document.querySelector('#btn-next');

    const nextBtnListenerSpy = jest.spyOn($nextBtn, 'addEventListener');

    const eventMock = {
      currentTarget: $nextBtn,
    };

    nextBtnListenerSpy.mockImplementationOnce((event, callback) => {
      callback(eventMock);
    });

    const loadPokemonMock = jest.fn();

    setPaginator(loadPokemonMock);

    expect(loadPokemonMock).toHaveBeenCalledTimes(1);
    expect(loadPokemonMock).toHaveBeenCalledWith(nextPokemonId);
  });

  it('Loads last pokemon when moving back from first pokemon', () => {
    const $currentPokemonId = document.querySelector('#id');
    $currentPokemonId.textContent = '1';
    const nextPokemonId = 898;
    const $previousBtn = document.querySelector('#btn-previous');

    const previousBtnListenerSpy = jest.spyOn($previousBtn, 'addEventListener');

    const eventMock = {
      currentTarget: document.querySelector('#btn-previous'),
    };

    previousBtnListenerSpy.mockImplementationOnce((event, callback) => {
      callback(eventMock);
    });

    const loadPokemonMock = jest.fn();

    setPaginator(loadPokemonMock);

    expect(loadPokemonMock).toHaveBeenCalledTimes(1);
    expect(loadPokemonMock).toHaveBeenCalledWith(nextPokemonId);
  });
});
