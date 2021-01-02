import getPokemonFromAPI from '../api/api.js';
import {
  getPokemon as getPokemonFromStorage,
  savePokemon as savePokemonInStorage,
} from '../storage/storage.js';
import pokemonMapper from '../mappers/mapper.js';

export default async function getPokemonById(pokemonId) {
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
