/**
 * @param {Number} id
 * @param {String} name
 * @param {Number} height
 * @param {Number} weight
 * @param {String} image
 */
function displayBasicInfo(id, name, height, weight, image) {
  document.querySelector('#id').textContent = `${id}`;
  document.querySelector('#name').textContent = `${name}`;
  document.querySelector('#height').textContent = `${height}`;
  document.querySelector('#weight').textContent = `${weight}`;
  document.querySelector('#image').src = image || './img/no-image.png';
}

/**
@param {Array<import('../entities/Type')>} types
 */
function displayTypes(types) {
  const $types = document.querySelector('#types');

  if ($types.children.length !== 0) {
    $types.innerHTML = '';
  }

  for (let i = 0; i < types.length; i += 1) {
    const $type = document.createElement('p');
    $type.textContent = types[i].name;
    $type.className = `pill pill-${types[i].name}`;
    $types.appendChild($type);
  }
}

/**
 * @param {Array<import('../entities/Stat')>} stats
 */
function displayStats(stats) {
  document.querySelector('#stat-value-hp').textContent = stats[0].value;
  document.querySelector('#stat-fill-hp').style.width = `${Math.min(stats[0].value, 100)}%`;

  document.querySelector('#stat-value-attack').textContent = stats[1].value;
  document.querySelector('#stat-fill-attack').style.width = `${Math.min(stats[1].value, 100)}%`;

  document.querySelector('#stat-value-defense').textContent = stats[2].value;
  document.querySelector('#stat-fill-defense').style.width = `${Math.min(stats[2].value, 100)}%`;

  document.querySelector('#stat-value-speed').textContent = stats[3].value;
  document.querySelector('#stat-fill-speed').style.width = `${Math.min(stats[3].value, 100)}%`;

  document.querySelector('#stat-value-sa').textContent = stats[4].value;
  document.querySelector('#stat-fill-sa').style.width = `${Math.min(stats[4].value, 100)}%`;

  document.querySelector('#stat-value-sd').textContent = stats[5].value;
  document.querySelector('#stat-fill-sd').style.width = `${Math.min(stats[5].value, 100)}%`;
}

/**
 * @param {Object} pokemon - Pokemon entity
 * @param {Number} pokemon.id
 * @param {String} pokemon.name
 * @param {Number} pokemon.height
 * @param {Number} pokemon.weight
 * @param {String} pokemon.image
 * @param {Array<import('../entities/Type')>} pokemon.types
 * @param {Array<import('../entities/Stat')>} pokemon.stats
 */
export default function displayPokemon({ id, name, height, weight, image, types, stats }) {
  displayBasicInfo(id, name, height, weight, image);
  displayTypes(types);
  displayStats(stats);
}
