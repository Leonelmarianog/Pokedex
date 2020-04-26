import getPokemon from './api.js';

import {
  showPokemonInfo,
  addDisplayError,
  removePokemonInfo,
  removeDisplayError,
  showLoadingText,
} from './ui.js';

import {
  getNextPosition,
  getPreviousPosition,
  refreshCurrentPosition,
} from './pagination.js';

export async function getFirstPokemon() {
  try {
    const pokemon = await getPokemon('1');
    showLoadingText('');
    showPokemonInfo(pokemon);
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function getNextPokemon() {
  try {
    showLoadingText('Loading...');
    const position = getNextPosition();
    refreshCurrentPosition(position);
    const pokemon = await getPokemon(position);
    removeDisplayError();
    showLoadingText('');
    showPokemonInfo(pokemon);
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function getPreviousPokemon() {
  try {
    showLoadingText('Loading...');
    const position = getPreviousPosition();
    refreshCurrentPosition(position);
    const pokemon = await getPokemon(position);
    removeDisplayError();
    showLoadingText('');
    showPokemonInfo(pokemon);
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function searchPokemon() {
  try {
    showLoadingText('Loading...');
    const pokemonName = document.querySelector('input').value.toLowerCase();
    const pokemon = await getPokemon(pokemonName);
    const position = pokemon.id;
    refreshCurrentPosition(position);
    removeDisplayError();
    showLoadingText('');
    showPokemonInfo(pokemon);
  } catch (error) {
    showLoadingText('');
    refreshCurrentPosition('1');
    addDisplayError();
    removePokemonInfo();
    console.log('ERROR', error);
  }
}
