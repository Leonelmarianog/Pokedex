export default function validateInput(input) {
  const error = {
    image: '/src/img/pikachu-pickaxe.jpg',
    message: "Don't mess with the search bar!",
  };
  if (input.length === 0) {
    // eslint-disable-next-line no-throw-literal
    throw error;
  }
}
