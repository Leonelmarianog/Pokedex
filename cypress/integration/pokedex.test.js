// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

before(() => {
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/1/', { fixture: 'bulbasaur.json' });
  cy.visit('http://127.0.0.1:8080/');
});

describe('Pokedex', () => {
  it('Loads first pokemon when visiting the page', () => {
    const ID = '1';
    const NAME = 'bulbasaur';
    const HEIGHT = '7';
    const WEIGHT = '69';
    const IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
    const TYPE1 = 'grass';
    const TYPE1_CLASS = `pill pill-${TYPE1}`;
    const TYPE2 = 'poison';
    const TYPE2_CLASS = `pill pill-${TYPE2}`;
    const HP_VALUE = '45';
    const ATTACK_VALUE = '49';
    const DEFENSE_VALUE = '49';
    const SPEED_VALUE = '65';
    const SPECIAL_ATTACK_VALUE = '65';
    const SPECIAL_DEFENSE_VALUE = '45';

    cy.get('[data-cy="id"]').should('have.text', ID);
    cy.get('[data-cy="name"]').should('have.text', NAME);
    cy.get('[data-cy="height"]').should('have.text', HEIGHT);
    cy.get('[data-cy="weight"]').should('have.text', WEIGHT);
    cy.get('[data-cy="image"]').should('have.attr', 'src', IMAGE);
    cy.get('[data-cy="types"] > *').should(($types) => {
      expect($types).to.have.length(2);
      expect($types[0]).to.have.text(TYPE1);
      expect($types[0]).to.have.class(TYPE1_CLASS);
      expect($types[1]).to.have.text(TYPE2);
      expect($types[1]).to.have.class(TYPE2_CLASS);
    });
    cy.get('[data-cy="stat-value-hp"]').should('have.text', HP_VALUE);
    cy.get('[data-cy="stat-value-attack"]').should('have.text', ATTACK_VALUE);
    cy.get('[data-cy="stat-value-defense"]').should('have.text', DEFENSE_VALUE);
    cy.get('[data-cy="stat-value-speed"]').should('have.text', SPEED_VALUE);
    cy.get('[data-cy="stat-value-sa"]').should('have.text', SPECIAL_ATTACK_VALUE);
    cy.get('[data-cy="stat-value-sd"]').should('have.text', SPECIAL_DEFENSE_VALUE);
    cy.get('[data-cy="stat-fill-hp"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-attack"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-defense"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-speed"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-sa"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-sd"]').invoke('width').should('be.above', 0);
  });

  it('Loads following pokemon after clicking right arrow button', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/2/', { fixture: 'ivysaur.json' });
    cy.get('[data-cy="btn-next"]')
      .click()
      .then(() => {
        cy.get('[data-cy="loading"]').should('be.visible');
      });

    const ID = '2';
    const NAME = 'ivysaur';
    const HEIGHT = '10';
    const WEIGHT = '130';
    const IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png';
    const TYPE1 = 'grass';
    const TYPE1_CLASS = `pill pill-${TYPE1}`;
    const TYPE2 = 'poison';
    const TYPE2_CLASS = `pill pill-${TYPE2}`;
    const HP_VALUE = '60';
    const ATTACK_VALUE = '62';
    const DEFENSE_VALUE = '63';
    const SPEED_VALUE = '80';
    const SPECIAL_ATTACK_VALUE = '80';
    const SPECIAL_DEFENSE_VALUE = '60';

    cy.get('[data-cy="loading"]').should('not.be.visible');
    cy.get('[data-cy="id"]').should('have.text', ID);
    cy.get('[data-cy="name"]').should('have.text', NAME);
    cy.get('[data-cy="height"]').should('have.text', HEIGHT);
    cy.get('[data-cy="weight"]').should('have.text', WEIGHT);
    cy.get('[data-cy="image"]').should('have.attr', 'src', IMAGE);
    cy.get('[data-cy="types"] > *').should(($types) => {
      expect($types).to.have.length(2);
      expect($types[0]).to.have.text(TYPE1);
      expect($types[0]).to.have.class(TYPE1_CLASS);
      expect($types[1]).to.have.text(TYPE2);
      expect($types[1]).to.have.class(TYPE2_CLASS);
    });
    cy.get('[data-cy="stat-value-hp"]').should('have.text', HP_VALUE);
    cy.get('[data-cy="stat-value-attack"]').should('have.text', ATTACK_VALUE);
    cy.get('[data-cy="stat-value-defense"]').should('have.text', DEFENSE_VALUE);
    cy.get('[data-cy="stat-value-speed"]').should('have.text', SPEED_VALUE);
    cy.get('[data-cy="stat-value-sa"]').should('have.text', SPECIAL_ATTACK_VALUE);
    cy.get('[data-cy="stat-value-sd"]').should('have.text', SPECIAL_DEFENSE_VALUE);
    cy.get('[data-cy="stat-fill-hp"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-attack"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-defense"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-speed"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-sa"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-sd"]').invoke('width').should('be.above', 0);
  });

  it('Loads previous pokemon after clicking left arrow button', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/1/', { fixture: 'bulbasaur.json' });
    cy.get('[data-cy="btn-previous"]')
      .click()
      .then(() => {
        cy.get('[data-cy="loading"]').should('be.visible');
      });

    const ID = '1';
    const NAME = 'bulbasaur';
    const HEIGHT = '7';
    const WEIGHT = '69';
    const IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
    const TYPE1 = 'grass';
    const TYPE1_CLASS = `pill pill-${TYPE1}`;
    const TYPE2 = 'poison';
    const TYPE2_CLASS = `pill pill-${TYPE2}`;
    const HP_VALUE = '45';
    const ATTACK_VALUE = '49';
    const DEFENSE_VALUE = '49';
    const SPEED_VALUE = '65';
    const SPECIAL_ATTACK_VALUE = '65';
    const SPECIAL_DEFENSE_VALUE = '45';

    cy.get('[data-cy="loading"]').should('not.be.visible');
    cy.get('[data-cy="id"]').should('have.text', ID);
    cy.get('[data-cy="name"]').should('have.text', NAME);
    cy.get('[data-cy="height"]').should('have.text', HEIGHT);
    cy.get('[data-cy="weight"]').should('have.text', WEIGHT);
    cy.get('[data-cy="image"]').should('have.attr', 'src', IMAGE);
    cy.get('[data-cy="types"] > *').should(($types) => {
      expect($types).to.have.length(2);
      expect($types[0]).to.have.text(TYPE1);
      expect($types[0]).to.have.class(TYPE1_CLASS);
      expect($types[1]).to.have.text(TYPE2);
      expect($types[1]).to.have.class(TYPE2_CLASS);
    });
    cy.get('[data-cy="stat-value-hp"]').should('have.text', HP_VALUE);
    cy.get('[data-cy="stat-value-attack"]').should('have.text', ATTACK_VALUE);
    cy.get('[data-cy="stat-value-defense"]').should('have.text', DEFENSE_VALUE);
    cy.get('[data-cy="stat-value-speed"]').should('have.text', SPEED_VALUE);
    cy.get('[data-cy="stat-value-sa"]').should('have.text', SPECIAL_ATTACK_VALUE);
    cy.get('[data-cy="stat-value-sd"]').should('have.text', SPECIAL_DEFENSE_VALUE);
    cy.get('[data-cy="stat-fill-hp"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-attack"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-defense"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-speed"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-sa"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-sd"]').invoke('width').should('be.above', 0);
  });

  it('Loads a specific pokemon when using the search bar', () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/charmander/', {
      fixture: 'charmander.json',
    });
    cy.get('[data-cy="pokemon-input"]').type('charmander');
    cy.get('[data-cy="btn-search"]')
      .click()
      .then(() => {
        cy.get('[data-cy="loading"]').should('be.visible');
      });

    const ID = '4';
    const NAME = 'charmander';
    const HEIGHT = '6';
    const WEIGHT = '85';
    const IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png';
    const TYPE = 'fire';
    const TYPE_CLASS = `pill pill-${TYPE}`;
    const HP_VALUE = '39';
    const ATTACK_VALUE = '52';
    const DEFENSE_VALUE = '43';
    const SPEED_VALUE = '60';
    const SPECIAL_ATTACK_VALUE = '50';
    const SPECIAL_DEFENSE_VALUE = '65';

    cy.get('[data-cy="loading"]').should('not.be.visible');
    cy.get('[data-cy="id"]').should('have.text', ID);
    cy.get('[data-cy="name"]').should('have.text', NAME);
    cy.get('[data-cy="height"]').should('have.text', HEIGHT);
    cy.get('[data-cy="weight"]').should('have.text', WEIGHT);
    cy.get('[data-cy="image"]').should('have.attr', 'src', IMAGE);
    cy.get('[data-cy="types"] > *').should(($types) => {
      expect($types).to.have.length(1);
      expect($types[0]).to.have.text(TYPE);
      expect($types[0]).to.have.class(TYPE_CLASS);
    });
    cy.get('[data-cy="stat-value-hp"]').should('have.text', HP_VALUE);
    cy.get('[data-cy="stat-value-attack"]').should('have.text', ATTACK_VALUE);
    cy.get('[data-cy="stat-value-defense"]').should('have.text', DEFENSE_VALUE);
    cy.get('[data-cy="stat-value-speed"]').should('have.text', SPEED_VALUE);
    cy.get('[data-cy="stat-value-sa"]').should('have.text', SPECIAL_ATTACK_VALUE);
    cy.get('[data-cy="stat-value-sd"]').should('have.text', SPECIAL_DEFENSE_VALUE);
    cy.get('[data-cy="stat-fill-hp"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-attack"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-defense"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-speed"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-sa"]').invoke('width').should('be.above', 0);
    cy.get('[data-cy="stat-fill-sd"]').invoke('width').should('be.above', 0);
  });

  it("Loads a fallback image if a pokemon doesn't have one", () => {
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/spectrier/', {
      fixture: 'spectrier.json',
    });
    cy.get('[data-cy="pokemon-input"]').clear().type('spectrier');
    cy.get('[data-cy="btn-search"]').click();

    const FALLBACK_IMAGE = './img/no-image.png';

    cy.get('[data-cy="image"]').should('have.attr', 'src', FALLBACK_IMAGE);
  });

  it('Shows a modal when validation fails', () => {
    cy.get('[data-cy="pokemon-input"]').clear();
    cy.get('[data-cy="btn-search"]').click();

    cy.get('#modal').should('be.visible');

    cy.get('[data-cy="btn-close-modal"]').click();

    cy.get('#modal').should('not.be.visible');
  });
});
