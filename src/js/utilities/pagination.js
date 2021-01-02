/**
 * @param {Number} currentPokemonId
 * @returns {Number}
 */
function getNextPokemonId(currentPokemonId) {
  let nextPokemonId = currentPokemonId + 1;

  if (nextPokemonId === 899) {
    nextPokemonId = 1;
  }

  return nextPokemonId;
}

/**
 * @param {Number} currentPokemonId
 * @returns {Number}
 */
function getPreviousPokemonId(currentPokemonId) {
  let previousPokemonId = currentPokemonId - 1;

  if (previousPokemonId === 0) {
    previousPokemonId = 898;
  }

  return previousPokemonId;
}

/**
 * @param {Number} currentPokemonId
 */
export function setCurrentPokemonId(currentPokemonId) {
  document.querySelector('#name').dataset.position = currentPokemonId;
}

/**
 * @param {String} action - "Next" or "Previous"
 * @param {Number} currentPokemonId
 * @returns {Number}
 */
export function getNewPokemonId(action, currentPokemonId) {
  let newPokemonId;

  if (action === 'next') {
    newPokemonId = getNextPokemonId(currentPokemonId);
  }

  if (action === 'back') {
    newPokemonId = getPreviousPokemonId(currentPokemonId);
  }

  return newPokemonId;
}
