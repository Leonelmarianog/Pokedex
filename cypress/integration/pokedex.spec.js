// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('Pokedex', () => {
  let fetchPolyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
      .then((response) => {
        fetchPolyfill = response.body;
      });

    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/1/', 'fixtures:bulbasaur').as('getBulbasaur');

    cy.visit('http://127.0.0.1:8080/', {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        // eslint-disable-next-line no-param-reassign
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });

  it('Show first pokemon', () => {
    const IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
    const NAME = 'Name: bulbasaur #1';
    const HEIGHT = 'Height: 7';
    const WEIGHT = 'Weight: 69';
    const FIRST_TYPE = 'poison';
    const SECOND_TYPE = 'grass';
    const HP = '45';
    const ATTACK = '49';
    const DEFENSE = '49';
    const SPEED = '45';
    const SPECIAL_ATTACK = '65';
    const SPECIAL_DEFENSE = '65';

    cy.get('#image')
      .should('have.attr', 'src', IMAGE);

    cy.get('#loading')
      .should('have.text', '');

    cy.get('#name')
      .should('have.text', NAME);

    cy.get('#height')
      .should('have.text', HEIGHT);

    cy.get('#weight')
      .should('have.text', WEIGHT);

    cy.get('#first-type')
      .should('have.text', FIRST_TYPE)
      .and('have.class', 'pill-background poison');

    cy.get('#second-type')
      .should('have.text', SECOND_TYPE)
      .and('have.class', 'pill-background grass');

    cy.get('#hp-value')
      .should('have.text', HP);

    cy.get('#attack-value')
      .should('have.text', ATTACK);

    cy.get('#defense-value')
      .should('have.text', DEFENSE);

    cy.get('#speed-value')
      .should('have.text', SPEED);

    cy.get('#special-attack-value')
      .should('have.text', SPECIAL_ATTACK);

    cy.get('#special-defense-value')
      .should('have.text', SPECIAL_DEFENSE);

    cy.get('#hp')
      .should('have.attr', 'style', `width: ${HP}%;`);

    cy.get('#attack')
      .should('have.attr', 'style', `width: ${ATTACK}%;`);

    cy.get('#defense')
      .should('have.attr', 'style', `width: ${DEFENSE}%;`);

    cy.get('#speed')
      .should('have.attr', 'style', `width: ${SPEED}%;`);

    cy.get('#special-attack')
      .should('have.attr', 'style', `width: ${SPECIAL_ATTACK}%;`);

    cy.get('#special-defense')
      .should('have.attr', 'style', `width: ${SPECIAL_DEFENSE}%;`);
  });

  it('Pagination', () => {
    const FIRST_PAGE = '1';
    const LAST_PAGE = '807';

    cy.get('#back').click();
    cy.get('#name')
      .should('have.attr', 'data-position', LAST_PAGE);

    cy.get('#next').click();
    cy.get('#name')
      .should('have.attr', 'data-position', FIRST_PAGE);
  });

  it('Show a new pokemon', () => {
    const IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png';
    const NAME = 'Name: ivysaur #2';
    const HEIGHT = 'Height: 10';
    const WEIGHT = 'Weight: 130';
    const FIRST_TYPE = 'poison';
    const SECOND_TYPE = 'grass';
    const HP = '60';
    const ATTACK = '62';
    const DEFENSE = '63';
    const SPEED = '60';
    const SPECIAL_ATTACK = '80';
    const SPECIAL_DEFENSE = '80';

    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/2/', 'fixture:ivysaur').as('getIvysaur');

    cy.get('#next').click();

    cy.get('#loading')
      .should('have.text', 'Loading...');

    cy.get('#image')
      .should('have.attr', 'src', IMAGE);

    cy.get('#loading')
      .should('have.text', '');

    cy.get('#name')
      .should('have.text', NAME);

    cy.get('#height')
      .should('have.text', HEIGHT);

    cy.get('#weight')
      .should('have.text', WEIGHT);

    cy.get('#first-type')
      .should('have.text', FIRST_TYPE)
      .and('have.class', 'pill-background poison');

    cy.get('#second-type')
      .should('have.text', SECOND_TYPE)
      .and('have.class', 'pill-background grass');

    cy.get('#hp-value')
      .should('have.text', HP);

    cy.get('#attack-value')
      .should('have.text', ATTACK);

    cy.get('#defense-value')
      .should('have.text', DEFENSE);

    cy.get('#speed-value')
      .should('have.text', SPEED);

    cy.get('#special-attack-value')
      .should('have.text', SPECIAL_ATTACK);

    cy.get('#special-defense-value')
      .should('have.text', SPECIAL_DEFENSE);

    cy.get('#hp')
      .should('have.attr', 'style', `width: ${HP}%;`);

    cy.get('#attack')
      .should('have.attr', 'style', `width: ${ATTACK}%;`);

    cy.get('#defense')
      .should('have.attr', 'style', `width: ${DEFENSE}%;`);

    cy.get('#speed')
      .should('have.attr', 'style', `width: ${SPEED}%;`);

    cy.get('#special-attack')
      .should('have.attr', 'style', `width: ${SPECIAL_ATTACK}%;`);

    cy.get('#special-defense')
      .should('have.attr', 'style', `width: ${SPECIAL_DEFENSE}%;`);
  });

  it('Show a single-type pokemon', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/4/', 'fixture:charmander')
      .as('getCharmander');

    cy.get('#next').click().click().click();

    cy.get('#second-type')
      .should('not.have.class')
      .and('have.text', '-');
  });

  it('Search Pokemon by name', () => {
    const NAME = 'Name: bulbasaur #1';

    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/bulbasaur/', 'fixture:bulbasaur')
      .as('getBulbasaur');

    cy.get('input').type('bulbasaur');
    cy.get('#search').click();

    cy.get('#name')
      .should('have.text', NAME);

    cy.get('#display')
      .should('have.class', 'no-error');
  });

  it('Search Pokemon by ID', () => {
    const NAME = 'Name: charmander #4';

    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/4/', 'fixture:charmander')
      .as('getCharmander');

    cy.get('input').clear();
    cy.get('input').type('4');
    cy.get('#search').click();

    cy.get('#name')
      .should('have.text', NAME);

    cy.get('#display')
      .should('have.class', 'no-error');
  });

  it('Do an invalid search', () => {
    cy.get('input').clear();
    cy.get('input').type('asd');
    cy.get('#search').click();

    cy.get('#display')
      .should('have.class', 'error');
  });
});
