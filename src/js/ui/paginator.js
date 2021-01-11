function managePagination(event, callback) {
  const { action } = event.currentTarget.dataset;
  const currentPokemonId = Number(document.querySelector('#id').textContent);
  let nextPokemonId;

  if (action === 'get-next') {
    nextPokemonId = currentPokemonId + 1;

    if (nextPokemonId === 899) {
      nextPokemonId = 1;
    }
  }

  if (action === 'get-previous') {
    nextPokemonId = currentPokemonId - 1;

    if (nextPokemonId === 0) {
      nextPokemonId = 898;
    }
  }

  callback(nextPokemonId);
}

export default function setPaginator(callback) {
  document.querySelector('#btn-next').addEventListener('click', (event) => {
    managePagination(event, callback);
  });
  document.querySelector('#btn-previous').addEventListener('click', (event) => {
    managePagination(event, callback);
  });
}
