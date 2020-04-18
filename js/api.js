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

export function getFirstPokemon() {
  fetch('https://pokeapi.co/api/v2/pokemon/1/')
    .then((answer) => answer.json())
    .then((answerJSON) => {
      showPokemonInfo(answerJSON);
    })
    .catch((error) => console.error('FALLO', error));
}

export function getNextPokemon() {
  const position = getNextPosition();
  refreshCurrentPosition(position);
  fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`)
    .then((answer) => answer.json())
    .then((answerJSON) => {
      removeDisplayError();
      showPokemonInfo(answerJSON);
    })
    .catch((error) => console.error('FALLO', error));
}

export function getPreviousPokemon() {
  const position = getPreviousPosition();
  refreshCurrentPosition(position);
  fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`)
    .then((answer) => answer.json())
    .then((answerJSON) => {
      removeDisplayError();
      showPokemonInfo(answerJSON);
    })
    .catch((error) => console.error('FALLO', error));
}

export function searchPokemon() {
  const pokemonName = document.querySelector('input').value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((answer) => answer.json())
    .then((answerJSON) => {
      const position = answerJSON.id;
      refreshCurrentPosition(position);
      removeDisplayError();
      showPokemonInfo(answerJSON);
    })
    .catch((error) => {
      refreshCurrentPosition('1');
      addDisplayError();
      removePokemonInfo();
      console.error('FALLO', error);
    });
}
