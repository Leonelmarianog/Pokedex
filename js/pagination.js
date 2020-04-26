export function getNextPosition() {
  let position = Number(document.querySelector('#name').dataset.position);
  position += 1;
  if (position === 808) {
    position = 1;
  }
  return position;
}

export function getPreviousPosition() {
  let position = Number(document.querySelector('#name').dataset.position);
  position -= 1;
  if (position === 0) {
    position = 807;
  }
  return position;
}

export function refreshCurrentPosition(position) {
  document.querySelector('#name').dataset.position = position;
}

export function getPosition(event) {
  let position;
  if (event.currentTarget.id === 'next') {
    position = getNextPosition();
  }
  if (event.currentTarget.id === 'back') {
    position = getPreviousPosition();
  }
  refreshCurrentPosition(position);
  return position;
}
