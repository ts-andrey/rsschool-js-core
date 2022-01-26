import { Racer } from './../interfaces/Racer';
import { CarData } from '../interfaces/CarData';

export class State {
  private _selectedCar: CarData;
  private _pageName: string;
  private _pageNumber: number;
  private _selectClass: string;
  private _pageCarRangeMin: number;
  private _pageCarRangeMax: number;
  private _totalCarAmount: number;
  private _pageCarsAmount: number;
  private _carsPerPage: number;
  private _winner: Racer;

  constructor() {
    this._selectedCar = {
      id: null,
      color: null,
      name: null,
    };
    this._pageName = 'garage';
    this._pageNumber = 1;
    this._selectClass = 'car-item-selected';
    this._pageCarRangeMin = 0;
    this._pageCarRangeMax = 0;
    this._totalCarAmount = 0;
    this._pageCarsAmount = 0;
    this._carsPerPage = 7;
    this._winner = null;
  }

  get selectedCar() {
    return this._selectedCar;
  }
  set selectedCar(value: CarData) {
    this._selectedCar = value;
  }

  get pageName() {
    return this._pageName;
  }
  set pageName(pageName: string) {
    this._pageName = pageName;
  }

  get pageNumber() {
    return this._pageNumber;
  }
  set pageNumber(pageNumber: number) {
    this._pageNumber = pageNumber;
  }

  get selectClass() {
    return this._selectClass;
  }

  get carAmount() {
    return this._totalCarAmount;
  }
  set carAmount(newAmount: number) {
    this._totalCarAmount = newAmount;
  }

  get pageCarRange() {
    return [this._pageCarRangeMin, this._pageCarRangeMax];
  }
  set pageCarRange(arr: number[]) {
    this._pageCarRangeMin = arr[0];
    this._pageCarRangeMax = arr[1];
  }

  get pageCarsAmount() {
    return this._pageCarsAmount;
  }
  set pageCarsAmount(value: number) {
    this._pageCarsAmount = value;
  }

  get carsPerPage() {
    return this._carsPerPage;
  }
  set carsPerPage(value: number) {
    this._carsPerPage = value;
  }

  get winner() {
    return this._winner;
  }
  set winner(racer: Racer) {
    this._winner = racer;
  }

  setState(state: State) {
    (Object.keys(state) as (keyof State)[]).forEach(key => {
      Object.assign(this, { [`${key}`]: state[key] });
    });
  }
}
