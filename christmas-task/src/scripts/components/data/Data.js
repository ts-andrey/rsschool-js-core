export class Data {
  constructor(data) {
    this.data = data;
  }

  filterByShape(type) {
    return this.data.filter(el => el.shape === type);
  }
  filterByColor(colors) {
    return this.data.filter(el => colors.includes(el.color));
  }
  filterBySize(size) {
    return this.data.filter(el => el.size === size);
  }
  filterFavourite() {
    return this.data.filter(el => el.favorite === true);
  }

  filterByAmount(minNumber, maxNumber) {
    return this.data.filter(el => Number(el.count) >= Number(minNumber) && Number(el.count) <= Number(maxNumber));
  }
  filterByYear(minYear, maxYear) {
    return this.data.filter(el => Number(el.year) >= Number(minYear) && Number(el.year) <= Number(maxYear));
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
}
