import { CarData } from '../interfaces/CarData';
import { CarRenderElems } from '../interfaces/carRenderElems';
import { carItemSetting, getPageNavBox, renderControl, getFinishIgm } from './Util';

export class GarageView {
  target: HTMLElement;
  constructor() {
    this.target = document.querySelector('.main-box');
  }
  render(carsNumber: number, pageNumber: number) {
    const container = document.createElement('div');
    container.classList.add('main__box', 'main-box');

    /* list for create/update start/reset operations */
    const manageList = renderControl();
    container.append(manageList);

    /* page info */
    const pageInfo = document.createElement('h3');
    pageInfo.classList.add('main-box__header');
    pageInfo.insertAdjacentText('beforeend', 'Garage (');

    const carsAmountEl: HTMLElement = document.createElement('span');
    carsAmountEl.classList.add('main-box__car-amount');
    carsAmountEl.innerText = String(carsNumber);
    pageInfo.insertAdjacentElement('beforeend', carsAmountEl);
    pageInfo.insertAdjacentText('beforeend', ')');

    /* page number */
    const pageNum = document.createElement('p');
    pageNum.classList.add('main-box__page-num');
    pageNum.innerText = 'Page #';

    const pageNumEl: HTMLElement = document.createElement('span');
    pageNumEl.classList.add('main-box__page-number');
    pageNumEl.innerText = String(pageNumber);
    pageNum.insertAdjacentElement('beforeend', pageNumEl);

    /* list of cars */
    const carList = document.createElement('ul');
    carList.classList.add('main-box__car-list', 'car-list');

    const pageNavBox = getPageNavBox();
    container.append(pageInfo, pageNum, carList, pageNavBox);
    this.target.replaceWith(container);
    return [pageInfo, pageNum];
  }

  clearCarList() {
    const target = document.querySelector('.car-list');
    target.innerHTML = '';
  }

  renderCar(carData?: CarData) {
    const target = document.querySelector('.car-list');

    const carItem = document.createElement('li');
    carItem.classList.add('car-list__item', 'car-item');

    const itemList = document.createElement('ul');
    itemList.classList.add('car-item__list');

    const infoRow = document.createElement('li');
    infoRow.classList.add('car-item__item');
    const controlRow = <HTMLElement>infoRow.cloneNode(true);

    const btnSelect = document.createElement('button');
    btnSelect.classList.add('car-item__btn');
    const btnRemove = <HTMLButtonElement>btnSelect.cloneNode(true);
    const model = document.createElement('p');
    model.classList.add('car-item__model');

    const btnStart = <HTMLButtonElement>btnSelect.cloneNode(true);
    const btnBack = <HTMLButtonElement>btnSelect.cloneNode(true);

    btnSelect.classList.add('car-item__btn_type_select');
    btnRemove.classList.add('car-item__btn_type_remove');
    btnStart.classList.add('car-item__btn_type_start');
    btnBack.classList.add('car-item__btn_type_back');

    const carBox = document.createElement('div');
    carBox.classList.add('car-item__car-img-box');

    const finishBox = document.createElement('div');
    finishBox.classList.add('car-item__finish-img-box');
    finishBox.insertAdjacentHTML('beforeend', getFinishIgm());

    carBox.append(btnStart, btnBack);
    carItemSetting(btnSelect, btnRemove, btnStart, btnBack, model, carBox, carData);
    infoRow.append(btnSelect, btnRemove, model);
    controlRow.append(carBox, finishBox);
    itemList.append(infoRow, controlRow);
    carItem.append(itemList);
    target.append(carItem);
    const renderedElems: CarRenderElems = {
      car: carItem,
      select: btnSelect,
      remove: btnRemove,
      start: btnStart,
      return: btnBack,
    };
    return renderedElems;
  }
}
