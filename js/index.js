import {
  getFirstPokemon,
  getNextPokemon,
  getPreviousPokemon,
  searchPokemon,
} from './api.js';

getFirstPokemon();
document.querySelector('#next').onclick = getNextPokemon;
document.querySelector('#back').onclick = getPreviousPokemon;
document.querySelector('#search').onclick = searchPokemon;
