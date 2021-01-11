import fs from 'fs';
import path from 'path';
import pokemonMapper from '../../mappers/mapper.js';
import displayPokemon from '../pokemon.js';
import pokedexBody from '../../../mocks/fixtures/indexHtml.js';

const pokemonData1 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../mocks/fixtures/bulbasaur.json'), 'utf-8')
);
const pokemonData2 = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../mocks/fixtures/spectrier.json'), 'utf-8')
);

const pokemon1 = pokemonMapper(pokemonData1);
const pokemon2 = pokemonMapper(pokemonData2);

beforeAll(() => {
  document.body.innerHTML = pokedexBody;
});

describe('displayPokemon', () => {
  it('Displays pokemon information in the page', () => {
    displayPokemon(pokemon1);

    const id = Number(document.querySelector('#id').textContent);
    const name = document.querySelector('#name').textContent;
    const height = Number(document.querySelector('#height').textContent);
    const weight = Number(document.querySelector('#weight').textContent);
    const image = document.querySelector('#image').src;

    const $types = document.querySelector('#types');

    const hpValue = Number(document.querySelector('#stat-value-hp').textContent);
    const hpFillWidth = document.querySelector('#stat-fill-hp').style.width;

    const attackValue = Number(document.querySelector('#stat-value-attack').textContent);
    const attackFillWidth = document.querySelector('#stat-fill-attack').style.width;

    const defenseValue = Number(document.querySelector('#stat-value-defense').textContent);
    const defenseFillWidth = document.querySelector('#stat-fill-defense').style.width;

    const speedValue = Number(document.querySelector('#stat-value-speed').textContent);
    const speedFillWidth = document.querySelector('#stat-fill-speed').style.width;

    const saValue = Number(document.querySelector('#stat-value-sa').textContent);
    const saFillWidth = document.querySelector('#stat-fill-sa').style.width;

    const sdValue = Number(document.querySelector('#stat-value-sd').textContent);
    const sdFillWidth = document.querySelector('#stat-fill-sd').style.width;

    expect(id).toBe(pokemon1.id);
    expect(name).toBe(pokemon1.name);
    expect(height).toBe(pokemon1.height);
    expect(weight).toBe(pokemon1.weight);
    expect(image).toBe(pokemon1.image);

    expect($types.children).toHaveLength(2);
    expect($types.children[0].textContent).toBe(pokemon1.types[0].name);
    expect($types.children[1].textContent).toBe(pokemon1.types[1].name);

    expect(hpValue).toBe(pokemon1.stats[0].value);
    expect(hpFillWidth).toBe(`${pokemon1.stats[0].value}%`);

    expect(attackValue).toBe(pokemon1.stats[1].value);
    expect(attackFillWidth).toBe(`${pokemon1.stats[1].value}%`);

    expect(defenseValue).toBe(pokemon1.stats[2].value);
    expect(defenseFillWidth).toBe(`${pokemon1.stats[2].value}%`);

    expect(speedValue).toBe(pokemon1.stats[3].value);
    expect(speedFillWidth).toBe(`${pokemon1.stats[3].value}%`);

    expect(saValue).toBe(pokemon1.stats[4].value);
    expect(saFillWidth).toBe(`${pokemon1.stats[4].value}%`);

    expect(sdValue).toBe(pokemon1.stats[5].value);
    expect(sdFillWidth).toBe(`${pokemon1.stats[5].value}%`);
  });

  it("Shows a fallback image when a pokemon doesn't have one", () => {
    displayPokemon(pokemon2);

    const image = document.querySelector('#image').src;

    expect(image).toMatch(/\bno-image.png\b/);
  });
});
