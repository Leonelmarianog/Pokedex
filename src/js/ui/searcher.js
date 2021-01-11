import validateInput from '../utilities/validation.js';
import showModal from './modal.js';
import setLoading from './textHelpers.js';

function manageSearch(callback) {
  try {
    const pokemonNameOrId = document.querySelector('#pokemon-input').value.toLowerCase().trim();
    validateInput(pokemonNameOrId);
    callback(pokemonNameOrId);
  } catch (error) {
    setLoading(false);
    showModal(error.image, error.message);
  }
}

export default function setSearcher(callback) {
  document.querySelector('#btn-search').addEventListener('click', () => {
    manageSearch(callback);
  });
}
