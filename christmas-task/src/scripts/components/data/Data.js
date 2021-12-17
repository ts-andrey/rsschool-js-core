export class Data {
  constructor(data) {
    this.data = data;
  }
  sortByName() {
    return this.data.sort((a, b) => a.name.localeCompare(b.name));
  }
  sortByNameReversed() {
    return this.data.sort((a, b) => a.name.localeCompare(b.name)).reverse();
  }
  sortByNumber() {
    return this.data.sort((a, b) => a.count - b.count);
  }
  sortByNumberReversed() {
    return this.data.sort((a, b) => a.count - b.count).reverse();
  }

  filterByType(type) {
    return this.data.filter(el => el.shape === type);
  }
  filterByColor(colors) {
    return this.data.filter(el => colors.includes(el.color));
  }
  filterBySize(size) {
    return this.data.filter(el => el.size === size);
  }
  filterFavourite(isOnlyFavourite) {
    return this.data.filter(el => el.favorite === isOnlyFavourite);
  }

  filterByYear(minYear, maxYear) {
    return this.data.filter(el => el.year >= minYear && el.year <= maxYear);
  }
  filterByNumber(minNumber, maxNumber) {
    return this.data.filter(el => el.count >= minNumber && el.count <= maxNumber);
  }
}
