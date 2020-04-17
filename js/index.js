getFirstPokemon();
document.querySelector('#next').onclick = getNextPokemon;
document.querySelector('#back').onclick = getPreviousPokemon;
document.querySelector('#search').onclick = searchPokemon;

function getFirstPokemon() {
  fetch('https://pokeapi.co/api/v2/pokemon/1/')
    .then((answer) => answer.json())
    .then((answerJSON) => {
      showBasicInfo(answerJSON);
      refreshStatBars(answerJSON);
    })
    .catch((error) => console.error('FALLO', error));
}

function getNextPokemon() {
  const position = getNextPosition();
  refreshCurrentPosition(position);
  fetch(`https://pokeapi.co/api/v2/pokemon/${position}/`)
    .then((answer) => answer.json())
    .then((answerJSON) => {
      removeErrorStyles();
      showBasicInfo(answerJSON);
      refreshStatBars(answerJSON);
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
      removeErrorStyles();
      showBasicInfo(answerJSON);
      refreshStatBars(answerJSON);
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
      removeErrorStyles();
      showBasicInfo(answerJSON);
      refreshStatBars(answerJSON);
    })
    .catch((error) => {
      refreshCurrentPosition('1');
      addErrorStyles();
      console.error('FALLO', error);
    });
}

function showBasicInfo(answerJSON) {
  document.querySelector('#image').src = answerJSON.sprites.front_default;
  document.querySelector('#name').innerText = `Name: ${answerJSON.name} #${answerJSON.id}`;
  document.querySelector('#height').innerText = `Height: ${answerJSON.height}`;
  document.querySelector('#weight').innerText = `Weight: ${answerJSON.weight}`;

  const types = getTypes(answerJSON);

  document.querySelector('#first-type').innerText = types['first-type'];
  document.querySelector('#second-type').innerText = types['second-type'];

  addTypeStyles(types);
  removeEmptyTypeStyle();
}

function refreshStatBars(answerJSON) {
  document.querySelector('#hp').style.width = `${Math.min(answerJSON.stats[5].base_stat, 100)}%`;
  document.querySelector('#attack').style.width = `${Math.min(answerJSON.stats[4].base_stat, 100)}%`;
  document.querySelector('#defense').style.width = `${Math.min(answerJSON.stats[3].base_stat, 100)}%`;
  document.querySelector('#speed').style.width = `${Math.min(answerJSON.stats[0].base_stat, 100)}%`;
  document.querySelector('#special-attack').style.width = `${Math.min(answerJSON.stats[2].base_stat, 100)}%`;
  document.querySelector('#special-defense').style.width = `${Math.min(answerJSON.stats[1].base_stat, 100)}%`;

  const stats = {
    hp: answerJSON.stats[5].base_stat,
    attack: answerJSON.stats[4].base_stat,
    defense: answerJSON.stats[3].base_stat,
    speed: answerJSON.stats[0].base_stat,
    'special-attack': answerJSON.stats[2].base_stat,
    'special-defense': answerJSON.stats[1].base_stat,
  };

  showStatsValues(stats);
}

function getTypes(answerJSON) {
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

function addTypeStyles(types) {
  document.querySelector('#first-type').className = `pill-background ${types['first-type']}`;
  document.querySelector('#second-type').className = `pill-background ${types['second-type']}`;
}

function removeEmptyTypeStyle() {
  if (document.querySelector('#second-type').innerText === '-') {
    document.querySelector('#second-type').className = '';
  }
}

function showStatsValues(stats) {
  document.querySelector('#hp-value').innerText = stats.hp;
  document.querySelector('#attack-value').innerText = stats.attack;
  document.querySelector('#defense-value').innerText = stats.defense;
  document.querySelector('#speed-value').innerText = stats.speed;
  document.querySelector('#special-attack-value').innerText = stats['special-attack'];
  document.querySelector('#special-defense-value').innerText = stats['special-defense'];
}

function addErrorStyles() {
  document.querySelector('#item-3').className = 'error';
  document.querySelector('#image').src = 'img/error.png';
  document.querySelector('#image').style.height = '5rem';
  document.querySelector('#image').style.padding = '2.5rem';

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

function removeErrorStyles() {
  if (document.querySelector('#item-3').className === 'error') {
    document.querySelector('#item-3').className = 'no-error';
    document.querySelector('#image').style.height = '';
    document.querySelector('#image').style.padding = '';
  }
}
