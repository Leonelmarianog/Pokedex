import getPokemonFromAPI from './api.js';

import {
  showPokemonInfo,
  addDisplayError,
  removePokemonInfo,
  removeDisplayError,
  showLoadingText,
} from './ui.js';

import {
  refreshCurrentPosition,
  getPosition,
} from './pagination.js';

// eslint-disable-next-line consistent-return
async function getPokemon(position) {
  try {
    const pokemon = await getPokemonFromAPI(position);
    return pokemon;
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function getFirstPokemon() {
  try {
    const pokemon = await getPokemonFromAPI('1');
    showLoadingText('');
    showPokemonInfo(pokemon);
  } catch (error) {
    console.log('ERROR', error);
  }
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
  try {
    showLoadingText('Loading...');
    const pokemonName = document.querySelector('input').value.toLowerCase();
    const pokemon = await getPokemonFromAPI(pokemonName);
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
