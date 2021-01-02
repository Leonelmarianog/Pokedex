export default class Pokemon {
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
