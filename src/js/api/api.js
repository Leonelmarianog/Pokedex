/**
 * @param {String|Number} id - Pokemon Name or Id Number
 * @returns {Object}
 */
export default async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);

  if (!response.ok) {
    const error = new Error();

    error.image = './img/worried-pikachu.png';
    error.message = 'Sorry, something went wrong! Try again in a few minutes!.';

    throw error;
  }

  const pokemonData = await response.json();
  return pokemonData;
}
