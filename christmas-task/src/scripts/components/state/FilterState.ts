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
    const newState = obj.filterState;
    (Object.keys(newState) as (keyof IFilterState)[]).forEach(key =>
      Object.assign(this.filterState, { [`${key}`]: newState[`${key}`] })
    );
  }
}
