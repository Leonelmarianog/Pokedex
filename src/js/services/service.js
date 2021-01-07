import getPokemonFromAPI from '../api/api.js';
import {
  getPokemon as getPokemonFromStorage,
  savePokemon as savePokemonInStorage,
} from '../storage/storage.js';
import pokemonMapper from '../mappers/mapper.js';

/**
 * @param {String|Number} pokemonId - Pokemon Name or Id Number
 * @returns {Promise<import('../entities/Pokemon')>}
 */
export default async function getPokemonByIdOrName(pokemonId) {
  try {
    const pokemonData = getPokemonFromStorage(pokemonId);
    const pokemon = pokemonMapper(pokemonData);
    return pokemon;
  } catch (error) {
    const pokemonData = await getPokemonFromAPI(pokemonId);
    savePokemonInStorage(pokemonData);
    const pokemon = pokemonMapper(pokemonData);
    return pokemon;
  }
}
