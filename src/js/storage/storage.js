/**
 * @param {String|Number} id - Pokemon Name or Id Number
 * @returns {Object}
 */
export function getPokemon(id) {
  const pokemonData = JSON.parse(localStorage.getItem(id));

  if (!pokemonData) {
    throw new Error('Pokemon not in storage.');
  }

  return pokemonData;
}

/**
 * @param {Object} pokemonData
 */
export function savePokemon(pokemonData) {
  if (!pokemonData) {
    throw new Error('A pokemon is needed in order to save it.');
  }

  try {
    localStorage.setItem(`${pokemonData.id}`, JSON.stringify(pokemonData));
  } catch (error) {
    localStorage.clear();
    localStorage.setItem(`${pokemonData.id}`, JSON.stringify(pokemonData));
  }
}
