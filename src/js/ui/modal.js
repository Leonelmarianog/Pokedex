function closeModal() {
  document.querySelector('#modal').style.display = 'none';
  document.querySelector('#overlay').style.opacity = '0';
}

/**
 * @param {String} image
 * @param {String} message
 */
export default function showModal(image, message) {
  document.querySelector('#overlay').style.opacity = '0.5';
  document.querySelector('#modal-img').src = image;
  document.querySelector('#modal-text').innerText = message;
  document.querySelector('#modal').style.display = 'block';
  document.querySelector('#btn-close-modal').onclick = closeModal;
}
