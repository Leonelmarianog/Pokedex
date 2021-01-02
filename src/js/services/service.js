import getPokemonFromRepository from '../repository/repository.js';

export default async function getPokemonById(pokemonId) {
  const pokemon = await getPokemonFromRepository(pokemonId);
  return pokemon;
}
