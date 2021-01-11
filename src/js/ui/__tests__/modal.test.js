import showModal from '../modal.js';
import pokedexBody from '../../../mocks/fixtures/indexHtml.js';

beforeEach(() => {
  document.body.innerHTML = pokedexBody;
});

describe('modal', () => {
  it('appears when called', () => {
    const imageMock = './img/worried-pikachu.png';
    const messageMock = 'Oops!';

    showModal(imageMock, messageMock);

    const $modal = document.querySelector('#modal');
    const modalImage = document.querySelector('#modal-img').getAttribute('src');
    const modalMessage = document.querySelector('#modal-text').innerText;
    const $overlay = document.querySelector('#overlay');

    expect($modal.style.display).toBe('block');
    expect(modalImage).toBe(imageMock);
    expect(modalMessage).toBe(messageMock);
    expect($overlay.style.opacity).toBe('0.5');
  });

  it('Dissapears when we close it', () => {
    const imageMock = './img/worried-pikachu.png';
    const messageMock = 'Oops!';

    showModal(imageMock, messageMock);

    const $modal = document.querySelector('#modal');
    const $overlay = document.querySelector('#overlay');

    const closeBtn = document.querySelector('#btn-close-modal').onclick;
    closeBtn();

    expect($modal.style.display).toBe('none');
    expect($overlay.style.opacity).toBe('0');
  });
});
