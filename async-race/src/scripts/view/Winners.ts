import { CarData } from '../interfaces/CarData';
import { WinCarData } from '../interfaces/WinCarData';
import { getPageNavBox, settingTable, getCarImg } from './Util';

export class WinnersView {
  target: HTMLElement;

  constructor() {
    this.target = document.querySelector('.main-box');
  }

  render(carsNumber: number, pageNumber: number) {
    const container = document.createElement('div');
    container.classList.add('main__box', 'main-box');

    /* page info */
    const pageInfo = document.createElement('h3');
    pageInfo.classList.add('main-box__header');
    pageInfo.insertAdjacentText('beforeend', 'Winners (');

    const carAmountEl = document.createElement('span');
    carAmountEl.classList.add('main-box__car-amount');
    carAmountEl.innerText = String(carsNumber);
    pageInfo.insertAdjacentElement('beforeend', carAmountEl);
    pageInfo.insertAdjacentText('beforeend', ')');

    /* page number */
    const pageNum = document.createElement('p');
    pageNum.classList.add('main-box__page-num');
    pageNum.insertAdjacentText('beforeend', 'Page #');

    const pageNumEl = document.createElement('span');
    pageNumEl.classList.add('main-box__page-number');
    pageNumEl.innerText = String(pageNumber);
    pageNum.insertAdjacentElement('beforeend', pageNumEl);

    /* winners table */
    const table = document.createElement('table');
    settingTable(table);

    const pageNavBox = getPageNavBox();
    container.append(pageInfo, pageNum, table, pageNavBox);

    this.target.replaceWith(container);
  }

  addWinner(winInfo?: WinCarData, carData?: CarData) {
    const target = document.querySelector('.win-table__body');

    const row = document.createElement('tr');

    const tdNumber = document.createElement('td');
    const tdCar = <HTMLTableCellElement>tdNumber.cloneNode(true);
    const tdName = <HTMLTableCellElement>tdNumber.cloneNode(true);
    const tdWins = <HTMLTableCellElement>tdNumber.cloneNode(true);
    const tdTime = <HTMLTableCellElement>tdNumber.cloneNode(true);

    tdNumber.classList.add('win-table__data-number');
    tdCar.classList.add('win-table__data-car');
    tdName.classList.add('win-table__data-name');
    tdWins.classList.add('win-table__data-wins');
    tdTime.classList.add('win-table__data-time');

    tdNumber.innerText = `${carData.id}`;
    tdCar.insertAdjacentHTML('beforeend', getCarImg('win', carData.id, carData.color));
    tdName.innerText = `${carData.name}`;
    tdWins.innerText = `${winInfo.wins}`;
    tdTime.innerText = `${winInfo.time}`;

    row.append(tdNumber, tdCar, tdName, tdWins, tdTime);
    target.append(row);
  }

  clearTable() {
    const tableContentEl = document.querySelector('.win-table__body');
    tableContentEl.innerHTML = '';
  }
}
