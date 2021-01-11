import setLoading from '../textHelpers.js';
import pokedexBody from '../../../mocks/fixtures/indexHtml.js';

beforeAll(() => {
  document.body.innerHTML = pokedexBody;
});

describe('setLoading', () => {
  it('Displays a "Loading" text when passed true', () => {
    setLoading(true);

    const $loading = document.querySelector('#loading');

    expect($loading.style.display).toBe('block');
  });

  it('Hiddes "Loading" text when passed false', () => {
    let $loading = document.querySelector('#loading');

    expect($loading.style.display).toBe('block');

    setLoading(false);

    $loading = document.querySelector('#loading');

    expect($loading.style.display).toBe('none');
  });
});
