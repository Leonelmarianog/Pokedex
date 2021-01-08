import { showModal, closeModal } from '../modal.js';
import pokedexBody from '../../../mocks/fixtures/indexHtml.js';

beforeAll(() => {
  document.body.innerHTML = pokedexBody;
});

describe('showModal', () => {
  it('Shows a modal', () => {
    const imageMock = './img/worried-pikachu.png';
    const messageMock = 'Oops!';

    showModal(imageMock, messageMock);

    const modalImage = document.querySelector('#modal-img').getAttribute('src');
    const modalMessage = document.querySelector('#modal-text').innerText;
    const modalDisplayValue = document.querySelector('#modal').style.display;

    expect(modalImage).toBe(imageMock);
    expect(modalMessage).toBe(messageMock);
    expect(modalDisplayValue === 'block').toBe(true);
  });
});

describe('closeModal', () => {
  it('Closes the modal', () => {
    let modalDisplayValue = document.querySelector('#modal').style.display;

    expect(modalDisplayValue === 'block').toBe(true);

    closeModal();

    modalDisplayValue = document.querySelector('#modal').style.display;

    expect(modalDisplayValue === 'none').toBe(true);
  });
});
