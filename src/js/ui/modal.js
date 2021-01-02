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
