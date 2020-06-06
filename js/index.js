import {
  showFirstPokemon,
  showNewPokemon,
} from './services.js';

showFirstPokemon();
document.querySelector('#next').onclick = showNewPokemon;
document.querySelector('#back').onclick = showNewPokemon;
document.querySelector('#search').onclick = showNewPokemon;
