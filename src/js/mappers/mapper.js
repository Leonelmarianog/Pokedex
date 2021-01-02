import Pokemon from '../entities/Pokemon.js';
import Stat from '../entities/Stat.js';
import Type from '../entities/Type.js';

function statMapper(stats) {
  const { name } = stats.stat;
  const { base_stat: value } = stats;
  return new Stat({ name, value: Number(value) });
}

function typeMapper({ name }) {
  return new Type({ name });
}

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
