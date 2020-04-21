export function checkPokemonTypes(answerJSON) {
  const types = {
    'first-type': answerJSON.types[0].type.name,
    'second-type': '-',
  };

  if (answerJSON.types[1] === undefined) {
    return types;
  }

  types['second-type'] = answerJSON.types[1].type.name;
  return types;
}

export function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const error = {
    status: response.status,
    statusText: response.statusText,
  };
  return Promise.reject(error);
}
