import setLoading from '../textHelpers.js';
import pokedexBody from '../../../mocks/fixtures/indexHtml.js';

beforeAll(() => {
  document.body.innerHTML = pokedexBody;
});

describe('setLoading', () => {
  it('Displays a "Loading" text when passed true', () => {
    setLoading(true);

    const textDisplayValue = document.querySelector('#loading').style.display;

    expect(textDisplayValue === 'block').toBe(true);
  });

  it('Hiddes "Loading" text when passed false', () => {
    let textDisplayValue = document.querySelector('#loading').style.display;

    expect(textDisplayValue === 'block').toBe(true);

    setLoading(false);

    textDisplayValue = document.querySelector('#loading').style.display;

    expect(textDisplayValue === 'none').toBe(true);
  });
});
