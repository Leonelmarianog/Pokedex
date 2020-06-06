import {
  showFirstPokemon,
  showNewPokemon,
} from './services.js';

import { closeModal } from './ui.js';

showFirstPokemon();
document.querySelector('#next').onclick = showNewPokemon;
document.querySelector('#back').onclick = showNewPokemon;
document.querySelector('#search').onclick = showNewPokemon;
document.querySelector('#close-modal').onclick = closeModal;
