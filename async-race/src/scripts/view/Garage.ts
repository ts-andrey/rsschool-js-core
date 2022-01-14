import { carItemSetting, getPageNavBox, renderControl } from './Util';

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
    pageInfo.innerText = `Garage (${carsNumber})`;
    /* page number */
    const pageNum = document.createElement('p');
    pageNum.classList.add('main-box__page-num');
    pageNum.innerText = `Page #${pageNumber}`;

    /* list of cars */
    const carList = document.createElement('ul');
    carList.classList.add('main-box__car-list', 'car-list');

    const pageNavBox = getPageNavBox();
    container.append(pageInfo, pageNum, carList, pageNavBox);
    this.target.replaceWith(container);
  }

  renderCar(carData?: object) {
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

    carItemSetting(btnSelect, btnRemove, btnStart, btnBack, model, carBox);

    infoRow.append(btnSelect, btnRemove, model);
    controlRow.append(btnStart, btnBack, carBox);
    itemList.append(infoRow, controlRow);
    carItem.append(itemList);
    target.append(carItem);
  }
}
