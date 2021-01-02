function displayBasicInfo(id, name, height, weight, image) {
  document.querySelector('#name').textContent = `Name: ${name} #${id}`;
  document.querySelector('#height').textContent = `Height: ${height}`;
  document.querySelector('#weight').textContent = `Weight: ${weight}`;
  document.querySelector('#image').src = image;
}

function displayTypes(types) {
  const typesContainer = document.querySelector('#types');

  if (typesContainer.children.length !== 0) {
    typesContainer.innerHTML = '';
  }

  for (let i = 0; i < types.length; i += 1) {
    const type = document.createElement('div');
    type.textContent = types[i].name;
    type.className = `pill-background ${types[i].name}`;
    typesContainer.appendChild(type);
  }
}

function displayStats(stats) {
  document.querySelector('#hp-value').textContent = stats[0].value;
  document.querySelector('#hp').style.width = `${Math.min(stats[0].value, 100)}%`;

  document.querySelector('#attack-value').textContent = stats[1].value;
  document.querySelector('#attack').style.width = `${Math.min(stats[1].value, 100)}%`;

  document.querySelector('#defense-value').textContent = stats[2].value;
  document.querySelector('#defense').style.width = `${Math.min(stats[2].value, 100)}%`;

  document.querySelector('#speed-value').textContent = stats[3].value;
  document.querySelector('#speed').style.width = `${Math.min(stats[3].value, 100)}%`;

  document.querySelector('#special-attack-value').textContent = stats[4].value;
  document.querySelector('#special-attack').style.width = `${Math.min(stats[4].value, 100)}%`;

  document.querySelector('#special-defense-value').textContent = stats[5].value;
  document.querySelector('#special-defense').style.width = `${Math.min(stats[5].value, 100)}%`;
}

export default function displayPokemon({ id, name, height, weight, image, types, stats }) {
  displayBasicInfo(id, name, height, weight, image);
  displayTypes(types);
  displayStats(stats);
}
