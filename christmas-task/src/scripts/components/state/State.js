export class State {
  constructor() {
    this.filterState = {
      shape: [false, ''],
      color: [false, false, false, false, false],
      size: [false, ''],
      favourite: false,
      amount: [1, 12],
      year: [1940, 2020],
      sortType: 'name',
      toysPick: [],
    };
  }

  resetFilterState() {
    this.filterState.shape = [false, ''];
    this.filterState.color = [false, false, false, false, false];
    this.filterState.size = [false, ''];
    this.filterState.favourite = false;
    this.filterState.amount = [1, 12];
    this.filterState.year = [1940, 2020];
  }

  setFilterState(obj) {
    this.filterState.shape = obj.filterState.shape;
    this.filterState.color = obj.filterState.color;
    this.filterState.size =  obj.filterState.size;
    this.filterState.favourite = obj.filterState.favourite;
    this.filterState.amount = obj.filterState.amount;
    this.filterState.year = obj.filterState.year;
    this.filterState.sortType = obj.filterState.sortType;
    this.filterState.toysPick = obj.filterState.toysPick;
  }
}