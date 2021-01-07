import getPokemonByIdOrName from './services/service.js';
import { showModal, closeModal, setLoading, displayPokemon } from './ui/index.js';
import { getNewPokemonId, validateInput } from './utilities/index.js';

/**
 * @returns {Promise<Boolean>}
 */
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

/**
 * @returns {Promise<Boolean>}
 */
async function loadRequestedPokemon() {
  setLoading(true);
  try {
    const pokemonNameOrId = document.querySelector('#pokemon-input').value.toLowerCase().trim();
    validateInput(pokemonNameOrId);
    const pokemon = await getPokemonByIdOrName(pokemonNameOrId);
    setLoading(false);
    displayPokemon(pokemon);
    return true;
  } catch (error) {
    setLoading(false);
    showModal(error.image, error.message);
    return false;
  }
}

/**
 * @param {Object} event - Event Object
 * @returns {Promise<Boolean>}
 */
async function loadNewPokemon(event) {
  setLoading(true);
  try {
    const { action } = event.currentTarget.dataset;
    const currentPokemonId = Number(document.querySelector('#id').textContent);
    const newPokemonId = getNewPokemonId(action, currentPokemonId);
    const pokemon = await getPokemonByIdOrName(newPokemonId);
    setLoading(false);
    displayPokemon(pokemon);
    return true;
  } catch (error) {
    setLoading(false);
    showModal(error.image, error.message);
    return false;
  }
}

export default function init() {
  loadFirstPokemon();
  document.querySelector('#btn-next').addEventListener('click', loadNewPokemon);
  document.querySelector('#btn-previous').addEventListener('click', loadNewPokemon);
  document.querySelector('#btn-search').addEventListener('click', loadRequestedPokemon);
  document.querySelector('#btn-close-modal').addEventListener('click', closeModal);
}
