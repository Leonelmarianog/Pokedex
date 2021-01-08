import fs from 'fs';
import path from 'path';
import { getPokemon, savePokemon } from '../storage.js';

const pokemonData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../mocks/fixtures/pikachu.json'), 'utf-8')
);

afterEach(() => global.localStorage.clear());

describe('getPokemon', () => {
  it('Fetchs a specific pokemon from localStorage if it is stored', () => {
    global.localStorage.setItem(`${pokemonData.id}`, JSON.stringify(pokemonData));

    const storedPokemonData = getPokemon(25);

    expect(storedPokemonData).toEqual(pokemonData);
  });

  it('Throws an error when trying to get a not stored pokemon from localStorage', () => {
    global.localStorage.setItem(`${pokemonData.id}`, JSON.stringify(pokemonData));

    try {
      getPokemon(20);
    } catch (error) {
      expect(error.message).toBe('Pokemon not in storage.');
    }
  });
});

describe('savePokemon', () => {
  it('Saves pokemonData in localStorage when valid data is passed', () => {
    savePokemon(pokemonData);

    const storedPokemonData = getPokemon(25);

    expect(storedPokemonData).toEqual(pokemonData);
  });

  it('Throws an error when no data is specified', () => {
    try {
      savePokemon();
    } catch (error) {
      expect(error.message).toBe('A pokemon is needed in order to save it.');
    }
  });

  it('Clears localStorage when there is no space left to save another pokemon', () => {
    // https://github.com/facebook/jest/issues/6858 - How to spy on localStorage
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const clearSpy = jest.spyOn(Storage.prototype, 'clear');

    setItemSpy.mockImplementationOnce(() => {
      throw new Error();
    });

    savePokemon(pokemonData);

    try {
      // Expect something
      expect(clearSpy).toHaveBeenCalledTimes(1);
      expect(setItemSpy).toHaveBeenCalledTimes(2);
      expect(setItemSpy).toHaveBeenNthCalledWith(
        2,
        String(pokemonData.id),
        JSON.stringify(pokemonData)
      );
    } catch (error) {
      // If test fails, restore mocks then throw the error
      setItemSpy.mockRestore();
      clearSpy.mockRestore();
      throw error;
    }

    // If test passes restore mocks anyway
    clearSpy.mockRestore();
    setItemSpy.mockRestore();
  });
});
