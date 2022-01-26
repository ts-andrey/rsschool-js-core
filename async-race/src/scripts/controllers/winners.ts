import { WinCarData } from './../interfaces/WinCarData';
import { WinnersState } from './../components/WinnersState';
import { getAllWinnersRequest, getCarRequest } from '../components/Requester';
import { Winners } from '../components/Winners';
import { WinnersView } from '../view/Winners';
import {
  checkWinState,
  disableButton,
  getStorageWinState,
  setStorageWinState,
  undisableButton,
} from '../components/Util';
import { CarData } from '../interfaces/CarData';

const SORT_WAY_ASC_CLASS = 'table-header_asc';
const SORT_WAY_DESC_CLASS = 'table-header_desc';

const winState = new WinnersState();
checkWinState(winState);

export const winnersController = async () => {
  const winners = new Winners();
  winners.seekerBtnPagePrev(btnPagePrevHandler);
  winners.seekerBtnPageNext(btnPageNextHandler);

  winners.seekerTableHeaderId(sortIdHandler);
  winners.seekerTableHeaderWins(sortWinsHandler);
  winners.seekerTableHeaderTime(sortTimeHandler);
};

function btnPagePrevHandler(btnPrev: HTMLButtonElement, btnNext: HTMLButtonElement) {
  const winState = new WinnersState();
  winState.setState(getStorageWinState());
  if (winState.winnersRange[0] > 1) {
    winState.pageNumber = winState.pageNumber - 1;
    winState.winnersRange = [winState.winnersRange[0] - 10, winState.winnersRange[1] - 10];
    winState.winnersPageAmount = 10;
    renderNewPage(winState);
    undisableButton(btnNext);
    if (!(winState.winnersRange[0] > 1)) {
      disableButton(btnPrev);
    }
  }
}

function btnPageNextHandler(btnPrev: HTMLButtonElement, btnNext: HTMLButtonElement) {
  const winState = new WinnersState();
  winState.setState(getStorageWinState());
  if (winState.winnersRange[1] <= winState.winnersAmount) {
    winState.pageNumber = winState.pageNumber + 1;
    winState.winnersRange = [winState.winnersRange[0] + 10, winState.winnersRange[1] + 10];
    winState.winnersPageAmount = 10;
    renderNewPage(winState);
    undisableButton(btnPrev);
    if (!(winState.winnersRange[1] <= winState.winnersAmount)) {
      disableButton(btnNext);
    }
  }
}

async function renderNewPage(winState: WinnersState) {
  const winView = new WinnersView();
  const winAmountEl: HTMLElement = document.querySelector('.main-box__car-amount');
  const winPageEl: HTMLElement = document.querySelector('.main-box__page-number');
  winAmountEl.innerText = String(winState.winnersAmount);
  winPageEl.innerText = String(winState.pageNumber);
  const pageWinners: WinCarData[] = await getAllWinnersRequest(
    winState.pageNumber,
    winState.winnersPerPage,
    winState.sortType,
    winState.sortOrder
  );
  winState.winnersPageAmount = pageWinners.length;
  setStorageWinState(winState);
  winView.clearTable();
  pageWinners.forEach(async el => {
    const carInfo: CarData = await getCarRequest(el.id);
    winView.addWinner(el, carInfo);
  });
}

async function sortIdHandler(idHeader: HTMLElement, winsHeader: HTMLElement, timeHeader: HTMLElement) {
  clearSortClasses(idHeader, winsHeader, timeHeader);
  await renderSortedContent('id', idHeader);
}
async function sortWinsHandler(idHeader: HTMLElement, winsHeader: HTMLElement, timeHeader: HTMLElement) {
  clearSortClasses(idHeader, winsHeader, timeHeader);
  await renderSortedContent('wins', winsHeader);
}
async function sortTimeHandler(idHeader: HTMLElement, winsHeader: HTMLElement, timeHeader: HTMLElement) {
  clearSortClasses(idHeader, winsHeader, timeHeader);
  await renderSortedContent('time', timeHeader);
}

async function renderSortedContent(sortType: string, el: HTMLElement) {
  const winView = new WinnersView();
  const winState = new WinnersState();
  winState.setState(getStorageWinState());
  const sortWay = checkSortType(winState, sortType, el);
  const pageWinners: WinCarData[] = await getAllWinnersRequest(
    winState.pageNumber,
    winState.winnersPerPage,
    sortType,
    sortWay
  );
  winView.clearTable();
  pageWinners.forEach(async el => {
    const carInfo: CarData = await getCarRequest(el.id);
    winView.addWinner(el, carInfo);
  });
}

function checkSortType(state: WinnersState, sortType: string, el: HTMLElement) {
  let sortWay = 'ASC';
  if (state.sortType === sortType) {
    if (state.sortOrder === sortWay) {
      sortWay = 'DESC';
      el.classList.add(SORT_WAY_DESC_CLASS);
    } else {
      el.classList.add(SORT_WAY_ASC_CLASS);
    }
  } else {
    el.classList.add(SORT_WAY_ASC_CLASS);
  }
  state.sortType = sortType;
  state.sortOrder = sortWay;
  setStorageWinState(state);
  return sortWay;
}

function clearSortClasses(idEl: HTMLElement, winEl: HTMLElement, timeEl: HTMLElement) {
  idEl.classList.remove(SORT_WAY_ASC_CLASS, SORT_WAY_DESC_CLASS);
  winEl.classList.remove(SORT_WAY_ASC_CLASS, SORT_WAY_DESC_CLASS);
  timeEl.classList.remove(SORT_WAY_ASC_CLASS, SORT_WAY_DESC_CLASS);
}
