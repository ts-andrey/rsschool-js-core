export class Data {
  constructor(data) {
    this.data = data;
  }

  filterByShape(type, toysArr) {
    if (!toysArr) {
      return this.data.filter(el => el.shape === type);
    } else {
      return toysArr.filter(el => el.shape === type);
    }
  }
  filterByColor(colors, toysArr) {
    if (!toysArr) {
      return this.data.filter(el => colors.includes(el.color));
    } else {
      if (colors.length === 0) return toysArr;
      return toysArr.filter(el => colors.includes(el.color));
    }
  }
  filterBySize(size, toysArr) {
    if (!toysArr) {
      return this.data.filter(el => el.size === size);
    } else {
      return toysArr.filter(el => el.size === size);
    }
  }
  filterFavourite(toysArr) {
    if (!toysArr) {
      return this.data.filter(el => el.favorite === true);
    } else {
      return toysArr.filter(el => el.favorite === true);
    }
  }

  filterByAmount(minNumber, maxNumber, toysArr) {
    if (!toysArr) {
      return this.data.filter(el => Number(el.count) >= Number(minNumber) && Number(el.count) <= Number(maxNumber));
    } else {
      return toysArr.filter(el => Number(el.count) >= Number(minNumber) && Number(el.count) <= Number(maxNumber));
    }
  }
  filterByYear(minYear, maxYear, toysArr) {
    if (!toysArr) {
      return this.data.filter(el => Number(el.year) >= Number(minYear) && Number(el.year) <= Number(maxYear));
    } else {
      return toysArr.filter(el => Number(el.year) >= Number(minYear) && Number(el.year) <= Number(maxYear));
    }
  }

  sortByName(toysArr) {
    if (!toysArr) {
      return this.data.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return toysArr.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
  sortByNameReversed(toysArr) {
    if (!toysArr) {
      return this.data.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    } else {
      return toysArr.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    }
  }
  sortByNumber(toysArr) {
    if (!toysArr) {
      return this.data.sort((a, b) => a.count - b.count);
    } else {
      return toysArr.sort((a, b) => a.count - b.count);
    }
  }
  sortByNumberReversed(toysArr) {
    if (!toysArr) {
      return this.data.sort((a, b) => a.count - b.count).reverse();
    } else {
      return toysArr.sort((a, b) => a.count - b.count).reverse();
    }
  }
}
