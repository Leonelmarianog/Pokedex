/**
 * @param {String} image
 * @param {String} message
 */
export function showModal(image, message) {
  document.querySelector('#modal-img').src = image;
  document.querySelector('#modal-text').innerText = message;
  document.querySelector('#modal').style.display = 'block';
  document.querySelector('#overlay').style.opacity = '0.5';
}

export function closeModal() {
  document.querySelector('#modal').style.display = 'none';
  document.querySelector('#overlay').style.opacity = '0';
}
