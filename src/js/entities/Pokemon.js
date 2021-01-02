export default class Pokemon {
  /**
   * @param {Object} pokemonData
   * @param {Number} pokemonData.id
   * @param {String} pokemonData.name
   * @param {Number} pokemonData.weight
   * @param {Number} pokemonData.height
   * @param {String} pokemonData.image
   * @param {Array<import('../entities/Type')>} pokemonData.types
   * @param {Array<import('../entities/Stat')>} pokemonData.stats
   */
  constructor({ id, name, weight, height, image, types, stats }) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.image = image;
    this.types = types;
    this.stats = stats;
  }
}
