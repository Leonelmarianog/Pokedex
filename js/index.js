import {
  getFirstPokemon,
  showNewPokemon,
  searchPokemon,
} from './services.js';

getFirstPokemon();
document.querySelector('#next').onclick = showNewPokemon;
document.querySelector('#back').onclick = showNewPokemon;
document.querySelector('#search').onclick = searchPokemon;
