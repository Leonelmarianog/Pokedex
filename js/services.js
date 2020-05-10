import getPokemonFromAPI from './api.js';

import {
  showPokemonInfo,
  removeDisplayError,
  showLoadingText,
  addDisplayError,
  removePokemonInfo,
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
  try {
    showLoadingText('Loading...');
    const pokemon = await getPokemon('1');
    showLoadingText('');
    showPokemonInfo(pokemon);
  } catch (error) {
    showLoadingText('');
    addDisplayError();
    removePokemonInfo();
    refreshCurrentPosition('1');
  }
}

export async function showNewPokemon(e) {
  try {
    removeDisplayError();
    showLoadingText('Loading...');
    const position = getPosition(e);
    const pokemon = await getPokemon(position);
    showLoadingText('');
    showPokemonInfo(pokemon);
  } catch (error) {
    showLoadingText('');
    addDisplayError();
    removePokemonInfo();
    refreshCurrentPosition('1');
  }
}

export async function searchPokemon() {
  try {
    removeDisplayError();
    showLoadingText('Loading...');
    const input = document.querySelector('input').value.toLowerCase();
    const pokemon = await getPokemon(input);
    const position = pokemon.id;
    refreshCurrentPosition(position);
    showLoadingText('');
    showPokemonInfo(pokemon);
  } catch (error) {
    console.log(error);
    showLoadingText('');
    addDisplayError();
    removePokemonInfo();
    refreshCurrentPosition('1');
  }
}
