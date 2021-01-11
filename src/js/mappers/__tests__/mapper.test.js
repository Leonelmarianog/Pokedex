import fs from 'fs';
import path from 'path';
import pokemonMapper from '../mapper.js';
import { Pokemon, Type, Stat } from '../../entities/index.js';

const pokemonData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../mocks/fixtures/bulbasaur.json'), 'utf-8')
);

describe('pokemonMapper', () => {
  it('Maps pokemon data into a pokemon entity', () => {
    const pokemon = pokemonMapper(pokemonData);

    expect(pokemon).toBeInstanceOf(Pokemon);
    expect(pokemon.types).toBeInstanceOf(Array);
    expect(pokemon.types[0]).toBeInstanceOf(Type);
    expect(pokemon.stats).toBeInstanceOf(Array);
    expect(pokemon.stats[0]).toBeInstanceOf(Stat);
  });
});
