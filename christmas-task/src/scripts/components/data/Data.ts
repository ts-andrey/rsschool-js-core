import { IData } from './IData';
export class Data {
  data: IData[];

  constructor(data: IData[]) {
    this.data = data;
  }

  filterByShape(type: string[], toysArr: IData[]) {
    if (!toysArr) {
      return this.data.filter(el => type.includes(el.shape));
    }
    if (type.length < 1) {
      return toysArr;
    }
    return toysArr.filter(el => type.includes(el.shape));
  }
  filterByColor(colors: string[], toysArr: IData[]) {
    if (!toysArr) {
      return this.data.filter(el => colors.includes(el.color));
    }
    if (colors.length < 1) {
      return toysArr;
    }
    return toysArr.filter(el => colors.includes(el.color));
  }
  filterBySize(size: string[], toysArr: IData[]) {
    if (!toysArr) {
      return this.data.filter(el => size.includes(el.size));
    }
    if (size.length < 1) {
      return toysArr;
    }
    return toysArr.filter(el => size.includes(el.size));
  }
  filterFavourite(toysArr: IData[]) {
    if (!toysArr) {
      return this.data.filter(el => el.favorite === true);
    }
    return toysArr.filter(el => el.favorite === true);
  }

  filterByAmount(minNumber: string, maxNumber: string, toysArr: IData[]) {
    if (!toysArr) {
      return this.data.filter(el => Number(el.count) >= Number(minNumber) && Number(el.count) <= Number(maxNumber));
    }
    return toysArr.filter(el => Number(el.count) >= Number(minNumber) && Number(el.count) <= Number(maxNumber));
  }
  filterByYear(minYear: string, maxYear: string, toysArr: IData[]) {
    if (!toysArr) {
      return this.data.filter(el => Number(el.year) >= Number(minYear) && Number(el.year) <= Number(maxYear));
    }
    return toysArr.filter(el => Number(el.year) >= Number(minYear) && Number(el.year) <= Number(maxYear));
  }

  sortByName(toysArr: IData[]) {
    if (!toysArr) {
      return this.data.sort((a, b) => a.name.localeCompare(b.name));
    }
    return toysArr.sort((a, b) => a.name.localeCompare(b.name));
  }
  sortByNameReversed(toysArr: IData[]) {
    if (!toysArr) {
      return this.data.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    }
    return toysArr.sort((a, b) => a.name.localeCompare(b.name)).reverse();
  }
  sortByNumber(toysArr: IData[]) {
    if (!toysArr) {
      return this.data.sort((a, b) => Number(a.count) - Number(b.count));
    }
    return toysArr.sort((a, b) => Number(a.count) - Number(b.count));
  }
  sortByNumberReversed(toysArr: IData[]) {
    if (!toysArr) {
      return this.data.sort((a, b) => Number(a.count) - Number(b.count)).reverse();
    }
    return toysArr.sort((a, b) => Number(a.count) - Number(b.count)).reverse();
  }
  sortByYear(toysArr: IData[]) {
    if (!toysArr) {
      return this.data.sort((a, b) => Number(a.year) - Number(b.year));
    }
    return toysArr.sort((a, b) => Number(a.year) - Number(b.year));
  }
  sortByYearReversed(toysArr: IData[]) {
    if (!toysArr) {
      return this.data.sort((a, b) => Number(a.year) - Number(b.year)).reverse();
    }
    return toysArr.sort((a, b) => Number(a.year) - Number(b.year)).reverse();
  }
}
