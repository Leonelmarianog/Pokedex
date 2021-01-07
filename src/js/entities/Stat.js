export default class Stat {
  /**
   * @param {Object} StatData
   * @param {String} StatData.name
   * @param {Number} StatData.value
   */
  constructor({ name, value }) {
    this.name = name;
    this.value = value;
  }
}
