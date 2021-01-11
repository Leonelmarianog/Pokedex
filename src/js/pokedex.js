import getPokemonByIdOrName from './services/service.js';
import { showModal, setLoading, displayPokemon, setPaginator, setSearcher } from './ui/index.js';

async function loadPokemon(pokemonId) {
  try {
    setLoading(true);
    const pokemon = await getPokemonByIdOrName(pokemonId);
    displayPokemon(pokemon);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    showModal(error.image, error.message);
  }
}

async function initPokedex() {
  await loadPokemon(1);

  setPaginator(loadPokemon);

  setSearcher(loadPokemon);
}

export default async function init() {
  await initPokedex();
}
