import getPokemonById from './service.js';
import { setLoading, showModal, displayPokemon, closeModal } from './ui.js';
import { getNewPokemonId, setCurrentPokemonId } from './pagination.js';
import validateInput from './utilities.js';

async function loadFirstPokemon() {
  setLoading(true);
  try {
    const pokemon = await getPokemonById(1);
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
    const pokemonId = document.querySelector('input').value.toLowerCase().trim();
    validateInput(pokemonId);
    const pokemon = await getPokemonById(pokemonId);
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
    const pokemon = await getPokemonById(newPokemonId);
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
