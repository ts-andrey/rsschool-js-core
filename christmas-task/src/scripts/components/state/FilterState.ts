import { IFilterState, IFilterStateStorage } from './IFilterState';

export class FilterState {
  filterState: IFilterState;
  constructor() {
    this.filterState = {
      shape: [],
      color: [],
      size: [],
      favourite: false,
      amount: ['1', '12'],
      year: ['1940', '2020'],
      sortType: 'name',
      toysPick: [],
    };
  }

  resetFilterState() {
    this.filterState.shape = [];
    this.filterState.color = [];
    this.filterState.size = [];
    this.filterState.favourite = false;
    this.filterState.amount = ['1', '12'];
    this.filterState.year = ['1940', '2020'];
  }
  resetFilterStateAll() {
    this.resetFilterState();
    this.filterState.sortType = 'name';
    this.filterState.toysPick = [];
  }

  setFilterState(obj: IFilterStateStorage) {
    this.filterState.shape = obj.filterState.shape;
    this.filterState.color = obj.filterState.color;
    this.filterState.size = obj.filterState.size;
    this.filterState.favourite = obj.filterState.favourite;
    this.filterState.amount = obj.filterState.amount;
    this.filterState.year = obj.filterState.year;
    this.filterState.sortType = obj.filterState.sortType;
    this.filterState.toysPick = obj.filterState.toysPick;
  }
}
