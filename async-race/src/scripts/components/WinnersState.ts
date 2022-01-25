export class WinnersState {
  _sortType: string;
  _sortOrder: string;
  _pageNumber: number;
  _winnersAmount: number;
  _winnersPerPage: number;
  _winnersRange: number[];
  _winnersPageAmount: number;

  constructor() {
    this._sortType = 'id';
    this._sortOrder = 'ASC';
    this._pageNumber = 1;
    this._winnersAmount = 0;
    this._winnersPerPage = 10;
    this._winnersRange = [1, 10];
    this._winnersPageAmount = 0;
  }

  get sortType() {
    return this._sortType;
  }
  set sortType(value: string) {
    this._sortType = value;
  }

  get sortOrder() {
    return this._sortOrder;
  }
  set sortOrder(value: string) {
    this._sortOrder = value;
  }

  get pageNumber() {
    return this._pageNumber;
  }
  set pageNumber(value: number) {
    this._pageNumber = value;
  }

  get winnersAmount() {
    return this._winnersAmount;
  }
  set winnersAmount(value: number) {
    this._winnersAmount = value;
  }

  get winnersPerPage() {
    return this._winnersPerPage;
  }
  set winnersPerPage(value: number) {
    this._winnersPerPage = value;
  }

  get winnersRange() {
    return this._winnersRange;
  }
  set winnersRange(value: number[]) {
    this._winnersRange = value;
  }

  get winnersPageAmount() {
    return this._winnersPageAmount;
  }
  set winnersPageAmount(value: number) {
    this._winnersPageAmount = value;
  }

  setState(state: WinnersState) {
    (Object.keys(state) as (keyof WinnersState)[]).forEach(key => {
      Object.assign(this, { [`${key}`]: state[key] });
    });
  }
}
