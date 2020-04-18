getFirstPokemon();
document.querySelector('#next').onclick = getNextPokemon;
document.querySelector('#back').onclick = getPreviousPokemon;
document.querySelector('#search').onclick = searchPokemon;

function getFirstPokemon() {
  fetch('https://pokeapi.co/api/v2/pokemon/1/')
    .then((answer) => answer.json())
    .then((answerJSON) => {
      showPokemonInfo(answerJSON);
    })
    .catch((error) => console.error('FALLO', error));
}

function getNextPokemon() {
  const position = getNextPosition();
  refreshCurrentPosition(position);
  fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`)
    .then((answer) => answer.json())
    .then((answerJSON) => {
      removeDisplayError();
      showPokemonInfo(answerJSON);
    })
    .catch((error) => console.error('FALLO', error));
}

function getNextPosition() {
  let position = Number(document.querySelector('#name').dataset.position);
  position += 1;
  if (position === 808) {
    position = 1;
  }
  return position;
}

function refreshCurrentPosition(position) {
  document.querySelector('#name').dataset.position = position;
}

function getPreviousPokemon() {
  const position = getPreviousPosition();
  refreshCurrentPosition(position);
  fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`)
    .then((answer) => answer.json())
    .then((answerJSON) => {
      removeDisplayError();
      showPokemonInfo(answerJSON);
    })
    .catch((error) => console.error('FALLO', error));
}

function getPreviousPosition() {
  let position = Number(document.querySelector('#name').dataset.position);
  position -= 1;
  if (position === 0) {
    position = 807;
  }
  return position;
}

function searchPokemon() {
  const pokemonName = document.querySelector('input').value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((answer) => answer.json())
    .then((answerJSON) => {
      const position = answerJSON.id;
      refreshCurrentPosition(position);
      removeDisplayError();
      showPokemonInfo(answerJSON);
    })
    .catch((error) => {
      refreshCurrentPosition('1');
      addDisplayError();
      removePokemonInfo();
      console.error('FALLO', error);
    });
}

function showPokemonInfo(answerJSON) {
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

function refreshStatBars(stats) {
  document.querySelector('#hp').style.width = `${Math.min(stats['hp-value'], 100)}%`;
  document.querySelector('#attack').style.width = `${Math.min(stats['attack-value'], 100)}%`;
  document.querySelector('#defense').style.width = `${Math.min(stats['defense-value'], 100)}%`;
  document.querySelector('#speed').style.width = `${Math.min(stats['speed-value'], 100)}%`;
  document.querySelector('#special-attack').style.width = `${Math.min(stats['special-attack-value'], 100)}%`;
  document.querySelector('#special-defense').style.width = `${Math.min(stats['special-defense-value'], 100)}%`;
}

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

function addDisplayError() {
  document.querySelector('#item-3').className = 'error';
  document.querySelector('#image').src = 'img/error.png';
  document.querySelector('#image').style.height = '5rem';
  document.querySelector('#image').style.padding = '2.5rem';
}

function removePokemonInfo() {
  document.querySelector('#name').innerText = 'Name: no-data';
  document.querySelector('#height').innerText = 'Height: no-data';
  document.querySelector('#weight').innerText = 'Weight: no-data';
  document.querySelector('#first-type').innerText = 'no-data';
  document.querySelector('#second-type').innerText = 'no-data';

  document.querySelector('#first-type').className = '';
  document.querySelector('#second-type').className = '';

  document.querySelector('#hp-value').innerText = 'no-data';
  document.querySelector('#attack-value').innerText = 'no-data';
  document.querySelector('#defense-value').innerText = 'no-data';
  document.querySelector('#speed-value').innerText = 'no-data';
  document.querySelector('#special-attack-value').innerText = 'no-data';
  document.querySelector('#special-defense-value').innerText = 'no-data';

  document.querySelector('#hp').style.width = '5%';
  document.querySelector('#attack').style.width = '5%';
  document.querySelector('#defense').style.width = '5%';
  document.querySelector('#speed').style.width = '5%';
  document.querySelector('#special-attack').style.width = '5%';
  document.querySelector('#special-defense').style.width = '5%';
}

function removeDisplayError() {
  if (document.querySelector('#item-3').className === 'error') {
    document.querySelector('#item-3').className = 'no-error';
    document.querySelector('#image').style.height = '';
    document.querySelector('#image').style.padding = '';
  }
}
