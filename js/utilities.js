export default function checkPokemonTypes(answerJSON) {
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
