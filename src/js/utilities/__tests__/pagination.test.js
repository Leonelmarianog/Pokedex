import getNewPokemonId from '../pagination.js';

describe('getNewPokemonId', () => {
  it('Returns next id', () => {
    const newPokemonId = getNewPokemonId('get-next', 1);
    expect(newPokemonId).toBe(2);
  });

  it('Returns the id #1 when moving pass the id #898', () => {
    const newPokemonId = getNewPokemonId('get-next', 898);
    expect(newPokemonId).toBe(1);
  });

  it('Returns previous id', () => {
    const newPokemonId = getNewPokemonId('get-previous', 2);
    expect(newPokemonId).toBe(1);
  });

  it('Returns the id #898 when moving back from id #1', () => {
    const newPokemonId = getNewPokemonId('get-previous', 1);
    expect(newPokemonId).toBe(898);
  });
});
