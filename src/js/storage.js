export function getPokemon(id) {
  const pokemon = JSON.parse(localStorage.getItem(id));

  if (!pokemon) {
    throw new Error('Pokemon not in storage.');
  }

  return pokemon;
}

export function savePokemon(pokemon) {
  if (!pokemon) {
    throw new Error('A pokemon is needed in order to save it.');
  }

  try {
    localStorage.setItem(`${pokemon.id}`, JSON.stringify(pokemon));
  } catch (error) {
    localStorage.clear();
    localStorage.setItem(`${pokemon.id}`, JSON.stringify(pokemon));
  }
}
