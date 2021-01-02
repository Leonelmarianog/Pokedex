import getPokemonByIdOrName from './services/service.js';
import { showModal, closeModal, setLoading, displayPokemon } from './ui/index.js';
import { getNewPokemonId, setCurrentPokemonId, validateInput } from './utilities/index.js';

async function loadFirstPokemon() {
  setLoading(true);
  try {
    const pokemon = await getPokemonByIdOrName(1);
    setLoading(false);
    displayPokemon(pokemon);
    return true;
  } catch (error) {
    setLoading(false);
    showModal(error.image, error.message);
    return false;
  }
}

async function loadRequestedPokemon() {
  setLoading(true);
  try {
    const pokemonNameOrId = document.querySelector('input').value.toLowerCase().trim();
    validateInput(pokemonNameOrId);
    const pokemon = await getPokemonByIdOrName(pokemonNameOrId);
    setLoading(false);
    displayPokemon(pokemon);
    setCurrentPokemonId(pokemon.id);
    return true;
  } catch (error) {
    setLoading(false);
    showModal(error.image, error.message);
    return false;
  }
}

async function loadNewPokemon(event) {
  setLoading(true);
  try {
    const action = event.currentTarget.id;
    const currentPokemonId = Number(document.querySelector('#name').dataset.position);
    const newPokemonId = getNewPokemonId(action, currentPokemonId);
    const pokemon = await getPokemonByIdOrName(newPokemonId);
    setLoading(false);
    displayPokemon(pokemon);
    setCurrentPokemonId(pokemon.id);
    return true;
  } catch (error) {
    setLoading(false);
    showModal(error.image, error.message);
    return false;
  }
}

export default function init() {
  loadFirstPokemon();
  document.querySelector('#next').addEventListener('click', loadNewPokemon);
  document.querySelector('#back').addEventListener('click', loadNewPokemon);
  document.querySelector('#search').addEventListener('click', loadRequestedPokemon);
  document.querySelector('#close-modal').addEventListener('click', closeModal);
}
