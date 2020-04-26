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

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const error = {
    status: response.status,
    statusText: response.statusText,
  };
  return Promise.reject(error);
}

export async function getFirstPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
    const responseJSON = await handleResponse(response);
    showLoadingText('');
    showPokemonInfo(responseJSON);
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function getNextPokemon() {
  try {
    showLoadingText('Loading...');
    const position = getNextPosition();
    refreshCurrentPosition(position);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`);
    const responseJSON = await handleResponse(response);
    removeDisplayError();
    showLoadingText('');
    showPokemonInfo(responseJSON);
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function getPreviousPokemon() {
  try {
    showLoadingText('Loading...');
    const position = getPreviousPosition();
    refreshCurrentPosition(position);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`);
    const responseJSON = await handleResponse(response);
    removeDisplayError();
    showLoadingText('');
    showPokemonInfo(responseJSON);
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function searchPokemon() {
  try {
    showLoadingText('Loading...');
    const pokemonName = document.querySelector('input').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const responseJSON = await handleResponse(response);
    const position = responseJSON.id;
    refreshCurrentPosition(position);
    removeDisplayError();
    showLoadingText('');
    showPokemonInfo(responseJSON);
  } catch (error) {
    showLoadingText('');
    refreshCurrentPosition('1');
    addDisplayError();
    removePokemonInfo();
    console.log('ERROR', error);
  }
}
