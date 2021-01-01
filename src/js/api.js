function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const error = {
    status: response.status,
    statusText: response.statusText,
    image: '/src/img/worried-pikachu.png',
    message: 'Sorry, something went wrong! Try again in a few minutes!.',
  };
  return Promise.reject(error);
}

export default async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const responseJSON = await handleResponse(response);
  return responseJSON;
}
