/**
 * @param {String} input
 * @returns {Boolean}
 */
export default function validateInput(input) {
  const error = new Error();

  if (input.length === 0) {
    error.image = '/src/img/pikachu-pickaxe.jpg';
    error.message = "Don't mess with the search bar!";

    throw error;
  }

  return true;
}
