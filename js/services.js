import getPokemonFromAPI from './api.js';

import {
  showPokemonInfo,
  removeDisplayError,
  showLoadingText,
} from './ui.js';

import {
  getPokemonFromStorage,
  savePokemonInStorage,
} from './storage.js';

import {
  refreshCurrentPosition,
  getPosition,
} from './pagination.js';

async function getPokemon(position) {
  try {
    const pokemon = getPokemonFromStorage(position);
    return pokemon;
  } catch (error) {
    const pokemon = await getPokemonFromAPI(position);
    savePokemonInStorage(pokemon);
    return pokemon;
  }
}

export async function showFirstPokemon() {
  showLoadingText('Loading...');
  const pokemon = await getPokemon('1');
  showLoadingText('');
  showPokemonInfo(pokemon);
}

export async function showNewPokemon(e) {
  removeDisplayError();
  showLoadingText('Loading...');
  const position = getPosition(e);
  const pokemon = await getPokemon(position);
  showLoadingText('');
  showPokemonInfo(pokemon);
}

export async function searchPokemon() {
  removeDisplayError();
  showLoadingText('Loading...');
  const input = document.querySelector('input').value.toLowerCase();
  const pokemon = await getPokemon(input);
  const position = pokemon.id;
  refreshCurrentPosition(position);
  showLoadingText('');
  showPokemonInfo(pokemon);
}
