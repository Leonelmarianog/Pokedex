export function getPokemonFromStorage(id) {
  const pokemon = JSON.parse(localStorage.getItem(id));
  if (pokemon === null) {
    throw new Error('Pokemon not in storage.');
  }
  return pokemon;
}

export function savePokemonInStorage(pokemon) {
  if (pokemon === undefined) {
    throw new Error('Pokemon is undefined');
  }
  try {
    localStorage.setItem(`${pokemon.id}`, JSON.stringify(pokemon));
  } catch (error) {
    localStorage.clear();
    localStorage.setItem(`${pokemon.id}`, JSON.stringify(pokemon));
  }
}
