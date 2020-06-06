function checkPokemonTypes(answerJSON) {
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

function managePokemonTypeStyles(types) {
  document.querySelector('#first-type').className = `pill-background ${types['first-type']}`;
  if (document.querySelector('#second-type').innerText === '-') {
    document.querySelector('#second-type').className = '';
  } else {
    document.querySelector('#second-type').className = `pill-background ${types['second-type']}`;
  }
}

function refreshStatBars(stats) {
  document.querySelector('#hp').style.width = `${Math.min(stats['hp-value'], 100)}%`;
  document.querySelector('#attack').style.width = `${Math.min(stats['attack-value'], 100)}%`;
  document.querySelector('#defense').style.width = `${Math.min(stats['defense-value'], 100)}%`;
  document.querySelector('#speed').style.width = `${Math.min(stats['speed-value'], 100)}%`;
  document.querySelector('#special-attack').style.width = `${Math.min(stats['special-attack-value'], 100)}%`;
  document.querySelector('#special-defense').style.width = `${Math.min(stats['special-defense-value'], 100)}%`;
}

export function showPokemonInfo(answerJSON) {
  const photo = answerJSON.sprites.front_default;
  const { name } = answerJSON;
  const { id } = answerJSON;
  const { height } = answerJSON;
  const { weight } = answerJSON;
  const types = checkPokemonTypes(answerJSON);
  const stats = {
    'hp-value': answerJSON.stats[5].base_stat,
    'attack-value': answerJSON.stats[4].base_stat,
    'defense-value': answerJSON.stats[3].base_stat,
    'speed-value': answerJSON.stats[0].base_stat,
    'special-attack-value': answerJSON.stats[2].base_stat,
    'special-defense-value': answerJSON.stats[1].base_stat,
  };

  document.querySelector('#image').src = photo;
  document.querySelector('#name').innerText = `Name: ${name} #${id}`;
  document.querySelector('#height').innerText = `Height: ${height}`;
  document.querySelector('#weight').innerText = `Weight: ${weight}`;
  document.querySelector('#first-type').innerText = types['first-type'];
  document.querySelector('#second-type').innerText = types['second-type'];

  document.querySelector('#hp-value').innerText = stats['hp-value'];
  document.querySelector('#attack-value').innerText = stats['attack-value'];
  document.querySelector('#defense-value').innerText = stats['defense-value'];
  document.querySelector('#speed-value').innerText = stats['speed-value'];
  document.querySelector('#special-attack-value').innerText = stats['special-attack-value'];
  document.querySelector('#special-defense-value').innerText = stats['special-defense-value'];

  managePokemonTypeStyles(types);
  refreshStatBars(stats);
}

export function showLoadingText(text) {
  document.querySelector('#loading').innerText = text;
}

export function showModal(image, text) {
  document.querySelector('#modal').style.display = 'flex';
  document.querySelector('#overlay').style.display = 'block';
  document.querySelector('#modal-img').src = image;
  document.querySelector('#modal-text').innerText = text;
}

export function closeModal() {
  document.querySelector('#modal').style.display = 'none';
  document.querySelector('#overlay').style.display = 'none';
}
