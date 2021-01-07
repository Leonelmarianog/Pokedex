import { Pokemon, Stat, Type } from '../entities/index.js';

/**
 * @param {Object} statData
 * @returns {import('../entities/Stat')}
 */
function statMapper(statData) {
  const { name } = statData.stat;
  const { base_stat: value } = statData;
  return new Stat({ name, value: Number(value) });
}

/**
 * @param {Object} typeData
 * @param {String} typeData.name
 * @returns {import('../entities/Type')}
 */
function typeMapper({ name }) {
  return new Type({ name });
}

/**
 * @param {Object} pokemonData
 * @param {string} pokemonData.id
 * @param {String} pokemonData.name
 * @param {String} pokemonData.weight
 * @param {String} pokemonData.height
 * @param {Object} pokemonData.sprites
 * @param {Array<Object>} pokemonData.types
 * @param {Array<Object>} pokemonData.stats
 */
export default function pokemonMapper({ id, name, height, weight, sprites, types, stats }) {
  return new Pokemon({
    id: Number(id),
    name,
    height: Number(height),
    weight: Number(weight),
    image: sprites.front_default,
    types: types.map((obj) => typeMapper(obj.type)),
    stats: stats.map((obj) => statMapper(obj)),
  });
}
