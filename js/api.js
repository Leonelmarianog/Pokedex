import {
  showPokemonInfo,
  addDisplayError,
  removePokemonInfo,
  removeDisplayError,
} from './ui.js';

import {
  getNextPosition,
  getPreviousPosition,
  refreshCurrentPosition,
} from './pagination.js';

import { handleResponse } from './utilities.js';

export async function getFirstPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
    const responseJSON = await handleResponse(response);
    showPokemonInfo(responseJSON);
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function getNextPokemon() {
  try {
    const position = getNextPosition();
    refreshCurrentPosition(position);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`);
    const responseJSON = await handleResponse(response);
    removeDisplayError();
    showPokemonInfo(responseJSON);
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function getPreviousPokemon() {
  try {
    const position = getPreviousPosition();
    refreshCurrentPosition(position);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`);
    const responseJSON = await handleResponse(response);
    removeDisplayError();
    showPokemonInfo(responseJSON);
  } catch (error) {
    console.log('ERROR', error);
  }
}

export async function searchPokemon() {
  try {
    const pokemonName = document.querySelector('input').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const responseJSON = await handleResponse(response);
    const position = responseJSON.id;
    refreshCurrentPosition(position);
    removeDisplayError();
    showPokemonInfo(responseJSON);
  } catch (error) {
    refreshCurrentPosition('1');
    addDisplayError();
    removePokemonInfo();
    console.log('ERROR', error);
  }
}
