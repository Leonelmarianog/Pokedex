import {
  addDisplayError,
  removePokemonInfo,
} from './ui.js';

import {
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

// eslint-disable-next-line consistent-return
export default async function getPokemon(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const responseJSON = await handleResponse(response);
    return responseJSON;
  } catch (e) {
    addDisplayError();
    removePokemonInfo();
    refreshCurrentPosition('1');
  }
}
