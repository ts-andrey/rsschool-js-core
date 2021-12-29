import { Data } from '../components/data/Data';

import { HomeView } from '../view/Home';
import { FilterView } from '../view/Filter';
import { CardView } from '../view/Card';
import { DecoratorView } from '../view/Decorator';

import { Filter } from '../components/filter/Filter';
import { Card } from '../components/card/Card';
import { Navigator } from '../components/home/Navigator';

import { FilterState } from '../components/state/FilterState';

import toysArray from '../../assets/data';
import { IFilterStateStorage } from '../components/state/IFilterState';
import { IData } from '../components/data/IData';
import { IFilters } from '../components/filter/IFilters';
import { Decorator } from '../components/dresser/Decorator';

import { DresserController } from './dresserController';

const LINK_ACTIVE_CLASS = 'nav-list__item_state_active';
const CARD_CHOSEN_CLASS = 'toy-card__mark_state_favourite';
const FILTER_SOLE_ACTIVE_CLASS = 'filters__filter-type_state_active';
const FILTER_MULTIPLE_CHECKED_CLASS = 'itemIsChecked';
const FILTER_LIST_HIDE = 'main-box__filters-wrapper_state_hidden';
const FILTER_NO_RESULT_CLASS = 'main-box__empty-result_state_visible';
const TOY_AMOUN_MIN = 1;
const TOY_AMOUNT_MAX = 12;
const TOY_YEAR_VALUE_MIN = 1940;
const TOY_YEAR_VALUE_MAX = 2020;
const SORT_LIST_SHOW_CLASS = 'sorter__sort-list_state_reveal';
const SEARCH_FIELD_SHOW_CLASS = 'search-box__field_state_visible';
const SEARCH_FIELD_CLEARER_SHOW_CLASS = 'search-box__value-clearer_state_visible';

// data - array with toys and info about them + filter/sort methods
const data = new Data(toysArray);

const decoratorView = new DecoratorView();
const filterView = new FilterView();
const homeView = new HomeView();

// let decorator = new Decorator();

const navigator = new Navigator();

const dresserController = new DresserController();

const state: IFilterStateStorage = new FilterState();
if (!localStorage.getItem('filterState')) {
  updateLocalStorage('filterState', state);
} else {
  state.setFilterState(JSON.parse(localStorage.getItem('filterState')));
}

// default handler
function navigatorLinkUpdate() {
  navigator.homeLink = new Navigator().homeLink;
  navigator.listenHomeFilterLink(filterViewHandler);
}

// init function
function init(array: NodeListOf<HTMLElement>) {
  hideSearchField();
  linkIdleHandler(array, LINK_ACTIVE_CLASS);
  homeView.render();
  navigatorLinkUpdate();
  // set amount of picked toys
  const toyPickAmount: HTMLElement = document.querySelector('.header-box__toy-counter');
  toyPickAmount.innerText = String(state.filterState.toysPick.length);
}

/*  helperFunctions */

function updateLocalStorage(key: string, value: IFilterStateStorage) {
  localStorage.setItem(key, JSON.stringify(value));
}

function sortHelper(option: string, items: IData[]) {
  switch (option) {
    case 'name': {
      const array = data.sortByName(items);
      toyCardsRenderer(array);
      break;
    }
    case 'name-reversed': {
      const array = data.sortByNameReversed(items);
      toyCardsRenderer(array);
      break;
    }
    case 'number': {
      const array = data.sortByNumber(items);
      toyCardsRenderer(array);
      break;
    }
    case 'number-reversed': {
      const array = data.sortByNumberReversed(items);
      toyCardsRenderer(array);
      break;
    }
    case 'year': {
      const array = data.sortByYear(items);
      toyCardsRenderer(array);
      break;
    }
    case 'year-reversed': {
      const array = data.sortByYearReversed(items);
      toyCardsRenderer(array);
      break;
    }
  }
}

function getFilteredToys(str?: string) {
  let result = data.data;
  const message = document.querySelector('.main-box__empty-result');

  // step#1: filter by shape
  result = data.filterByShape(state.filterState.shape, result);
  // step#2: if there is any color filters -> filter toys by them
  result = data.filterByColor(state.filterState.color, result);
  // step#3: filter by size
  result = data.filterBySize(state.filterState.size, result);
  // step#4: show only favourite if checked
  if (state.filterState.favourite) {
    result = data.filterFavourite(result);
  } else {
    undefined;
  }
  // step#5: show toys of selected amount range
  result = data.filterByAmount(state.filterState.amount[0], state.filterState.amount[1], result);
  // step#6: show toys of selected year range
  result = data.filterByYear(state.filterState.year[0], state.filterState.year[1], result);

  // step#7? (optional): search filtering if there any
  if (str) {
    result = result.filter(el => el.name.toLowerCase().includes(str.toLowerCase()));
  }
  if (result.length < 1) {
    message.classList.add(FILTER_NO_RESULT_CLASS);
  } else {
    if (message.classList.contains(FILTER_NO_RESULT_CLASS)) {
      message.classList.remove(FILTER_NO_RESULT_CLASS);
    }
  }
  // last_step: sort final pick by chosen option
  return sortHelper(state.filterState.sortType, result);
}

function getPercents(val: number) {
  let result;
  if (val < 13) {
    const diff = TOY_AMOUNT_MAX - TOY_AMOUN_MIN;
    const tempVal = diff - (TOY_AMOUNT_MAX - val);
    result = tempVal * (100 / diff);
  } else {
    const diff = TOY_YEAR_VALUE_MAX - TOY_YEAR_VALUE_MIN;
    const tempVal = diff - (TOY_YEAR_VALUE_MAX - val);
    result = tempVal * (100 / diff);
  }
  return result;
}

function rangeHandler(
  minBox: HTMLElement,
  maxBox: HTMLElement,
  [minVal, maxVal]: HTMLInputElement[],
  backgroundEl: HTMLElement
) {
  if (Number(minVal.value) < Number(maxVal.value)) {
    minBox.innerText = minVal.value;
    maxBox.innerText = maxVal.value;
  } else {
    minBox.innerText = maxVal.value;
    maxBox.innerText = minVal.value;
  }
  const min = Number(minBox.innerText);
  const max = Number(maxBox.innerText);

  backgroundEl.style.background = `linear-gradient(to right, rgba(0, 65, 95, 0.851) 0%, rgba(0, 65, 95, 0.851) ${getPercents(
    min
  )}%, rgb(19, 228, 0) ${getPercents(min)}%, rgb(19, 228, 0) ${getPercents(max)}%, rgba(0, 65, 95, 0.851) ${getPercents(
    max
  )}%, rgba(0, 65, 95, 0.851) 100%)`;
  return [String(min), String(max)];
}

function linkIdleHandler(array: NodeListOf<HTMLElement>, removeClass: string) {
  array.forEach(el => {
    el.classList.remove(removeClass);
  });
}

function toyCardsRenderer(array: IData[]) {
  const cardView = new CardView();
  cardView.targetElement.innerHTML = '';
  if (array) {
    array.forEach(el => {
      new CardView(el).render(state.filterState.toysPick);
    });
  } else {
    data.data.forEach(el => {
      new CardView(el).render(state.filterState.toysPick);
    });
  }
  const card = new Card();
  card.cardsSeeker(cardHandler);
}

function classRemover(itemArray: NodeListOf<HTMLElement> | HTMLElement[], className: string) {
  itemArray.forEach(el => {
    el.classList.remove(className);
  });
}

function textRemover(itemArray: NodeListOf<HTMLElement> | HTMLElement[]) {
  itemArray.forEach(el => {
    el.innerText = '';
  });
}

function setRangeStyle(allFilters: IFilters, type: string) {
  let currTarget;
  let currStateValues;
  if (type === 'amount') {
    currTarget = allFilters.amount;
    currStateValues = state.filterState.amount;
  } else {
    currTarget = allFilters.year;
    currStateValues = state.filterState.year;
  }
  currTarget.filters[0].value = currStateValues[0];
  currTarget.filters[1].value = currStateValues[1];
  rangeHandler(currTarget.minBox, currTarget.maxBox, <HTMLInputElement[]>currTarget.filters, currTarget.background);
}

function stylesReset(filters: IFilters) {
  // reset shape styles
  classRemover(filters.shape, FILTER_SOLE_ACTIVE_CLASS);
  // reset color styles
  classRemover(filters.color, FILTER_MULTIPLE_CHECKED_CLASS);
  textRemover(filters.color);
  // reset size styles
  classRemover(filters.size, FILTER_SOLE_ACTIVE_CLASS);
  // reset favourite styles
  classRemover([filters.favourite], FILTER_MULTIPLE_CHECKED_CLASS);
  textRemover([filters.favourite]);
  // reset range-amount styles
  setRangeStyle(filters, 'amount');
  // reset range-year styles
  setRangeStyle(filters, 'year');
}

function stylesInit(filters: IFilters) {
  // set shape styles
  if (state.filterState.shape.length > 0) {
    filters.shape.forEach(el => {
      if (state.filterState.shape.includes(el.getAttribute('data-shape'))) {
        el.classList.add(FILTER_SOLE_ACTIVE_CLASS);
      }
    });
  }

  // set color styles
  if (state.filterState.color.length > 0) {
    filters.color.forEach(el => {
      if (state.filterState.color.includes(el.getAttribute('data-color'))) {
        el.classList.add(FILTER_MULTIPLE_CHECKED_CLASS);
        el.innerText = '✓';
      }
    });
  }

  // set size styles
  if (state.filterState.size.length > 0) {
    filters.size.forEach(el => {
      if (state.filterState.size.includes(el.getAttribute('data-size'))) {
        el.classList.add(FILTER_SOLE_ACTIVE_CLASS);
      }
    });
  }
  // set favourite style
  if (state.filterState.favourite) {
    filters.favourite.classList.add(FILTER_MULTIPLE_CHECKED_CLASS);
    filters.favourite.innerText = '✓';
  }
  // set range-amount styles
  setRangeStyle(filters, 'amount');
  // set range-year styles
  setRangeStyle(filters, 'year');

  // set current sort-option
  filters.sorting.allOptions.forEach(el => {
    if (el.getAttribute('data-sort-option') === state.filterState.sortType) {
      filters.sorting.curOption.innerText = el.innerText;
    }
  });
}

function hideSearchField() {
  const searchField: HTMLInputElement = document.querySelector('.search-box__field');
  const searchFielClearer: HTMLElement = document.querySelector('.search-box__value-clearer');
  if (searchField.classList.contains(SEARCH_FIELD_SHOW_CLASS)) {
    searchField.classList.remove(SEARCH_FIELD_SHOW_CLASS);
  }
  if (searchFielClearer.classList.contains(SEARCH_FIELD_CLEARER_SHOW_CLASS)) {
    searchFielClearer.classList.remove(SEARCH_FIELD_CLEARER_SHOW_CLASS);
  }
}

/* FILTER PAGE */
/*  handlers for filter seekers */

function toyShapeHandler(item: HTMLElement) {
  const hasFilter = item.classList.contains(FILTER_SOLE_ACTIVE_CLASS);
  if (!hasFilter) {
    state.filterState.shape.push(item.getAttribute('data-shape'));
  } else {
    state.filterState.shape = state.filterState.shape.filter(el => el !== item.getAttribute('data-shape'));
  }
  item.classList.toggle(FILTER_SOLE_ACTIVE_CLASS);
  getFilteredToys();
  updateLocalStorage('filterState', state);
}

function toyColorHandler(item: HTMLElement) {
  const hasFilter = item.classList.contains(FILTER_MULTIPLE_CHECKED_CLASS);
  if (!hasFilter) {
    item.innerText = '✓';
    state.filterState.color.push(item.getAttribute('data-color'));
  } else {
    item.innerText = '';
    state.filterState.color = state.filterState.color.filter(el => el !== item.getAttribute('data-color'));
  }
  item.classList.toggle(FILTER_MULTIPLE_CHECKED_CLASS);
  getFilteredToys();
  updateLocalStorage('filterState', state);
}

function toySizeHandler(item: HTMLElement) {
  const hasFilter = item.classList.contains(FILTER_SOLE_ACTIVE_CLASS);
  if (!hasFilter) {
    state.filterState.size.push(item.getAttribute('data-size'));
  } else {
    state.filterState.size = state.filterState.size.filter(el => el !== item.getAttribute('data-size'));
  }
  item.classList.toggle(FILTER_SOLE_ACTIVE_CLASS);
  getFilteredToys();
  updateLocalStorage('filterState', state);
}

function toyFavouriteHandler(item: HTMLElement) {
  if (!item.classList.contains(FILTER_MULTIPLE_CHECKED_CLASS)) {
    item.innerText = '✓';
    state.filterState.favourite = true;
  } else {
    item.innerText = '';
    state.filterState.favourite = false;
  }
  item.classList.toggle(FILTER_MULTIPLE_CHECKED_CLASS);
  getFilteredToys();
  updateLocalStorage('filterState', state);
}

function toyAmountHandler(
  minBox: HTMLElement,
  maxBox: HTMLElement,
  [minVal, maxVal]: HTMLInputElement[],
  backgroundEl: HTMLElement
) {
  const result = rangeHandler(minBox, maxBox, [minVal, maxVal], backgroundEl);
  state.filterState.amount = result;
  getFilteredToys();
  updateLocalStorage('filterState', state);
}
function toyYearHandler(
  minBox: HTMLElement,
  maxBox: HTMLElement,
  [minVal, maxVal]: HTMLInputElement[],
  backgroundEl: HTMLElement
) {
  const result = rangeHandler(minBox, maxBox, [minVal, maxVal], backgroundEl);
  state.filterState.year = result;
  getFilteredToys();
  updateLocalStorage('filterState', state);
}

function sortListAppearanceHandler(element: HTMLElement) {
  element.classList.toggle(SORT_LIST_SHOW_CLASS);
}

function sortOptionHandler(curOptionElement: HTMLElement, eventElement: HTMLElement, sortList: HTMLElement) {
  curOptionElement.innerText = eventElement.innerText;
  const sortOption = eventElement.getAttribute('data-sort-option');

  state.filterState.sortType = sortOption;
  sortList.classList.remove(SORT_LIST_SHOW_CLASS);
  getFilteredToys();
  updateLocalStorage('filterState', state);
}

function searchStyleIconHandler(field: HTMLInputElement, clearer: HTMLElement) {
  clearer.classList.remove(SEARCH_FIELD_CLEARER_SHOW_CLASS);
  field.style.backgroundImage = 'url(./assets/svg/search.svg)';
}

function searchClearer(field: HTMLInputElement, clearer: HTMLElement) {
  clearer.addEventListener('click', () => {
    searchStyleIconHandler(field, clearer);
    field.value = '';
    getFilteredToys(field.value);
  });
}

function searchStyleHandler(field: HTMLInputElement, clearer: HTMLElement) {
  if (field.value.length > 0) {
    field.style.backgroundImage = 'none';
    clearer.classList.add(SEARCH_FIELD_CLEARER_SHOW_CLASS);
  } else {
    searchStyleIconHandler(field, clearer);
  }
}

function searchHandler(el: HTMLInputElement) {
  getFilteredToys(el.value);
  const searchFieldClearer: HTMLElement = document.querySelector('.search-box__value-clearer');
  searchStyleHandler(el, searchFieldClearer);
  searchClearer(el, searchFieldClearer);
  searchStyleHandler(el, searchFieldClearer);
}

function filterResetHandler() {
  const allFilters = new Filter().getAllElements();

  /*  reset filters */
  state.resetFilterState();
  updateLocalStorage('filterState', state);

  /* reset filter styles */
  stylesReset(allFilters);

  /* rerender toy cards */
  getFilteredToys();
}

function storageResetHandler() {
  const allFilters = new Filter().getAllElements();
  const toyPickCounter: HTMLElement = document.querySelector('.header-box__toy-counter');
  localStorage.clear();
  state.resetFilterStateAll();
  toyPickCounter.innerText = String(state.filterState.toysPick.length);
  stylesReset(allFilters);
  const sortValue: HTMLElement = document.querySelector('.sorter__sort-value');
  sortValue.innerText = 'Сортировать по имени А→Я';
  getFilteredToys();
}

function pinnerHandler(pinner: HTMLElement, filterList: HTMLElement) {
  pinner.innerText = pinner.innerText === 'скрыть' ? 'показать' : 'скрыть';
  filterList.classList.toggle(FILTER_LIST_HIDE);
}

/* card handler */
function cardHandler(mark: HTMLElement, toyPickCounter: HTMLElement, element: HTMLElement) {
  const cardNumber = element.getAttribute('data-num');
  if (state.filterState.toysPick.length === 20 && !mark.classList.contains(CARD_CHOSEN_CLASS)) {
    return alert('Можно выбрать лишь не более 20 игрушек');
  } else {
    if (mark.classList.contains(CARD_CHOSEN_CLASS)) {
      state.filterState.toysPick = state.filterState.toysPick.filter(el => el !== cardNumber);
    } else {
      state.filterState.toysPick.push(cardNumber);
    }
    mark.classList.toggle(CARD_CHOSEN_CLASS);
    toyPickCounter.innerText = String(state.filterState.toysPick.length);
    updateLocalStorage('filterState', state);
  }
}

function selectSearchFieldHandler() {
  const searchField: HTMLInputElement = document.querySelector('.search-box__field');
  searchField.classList.add(SEARCH_FIELD_SHOW_CLASS);
  searchField.focus();
  searchField.select();
}

/* ********* DECORATOR HANDLERS ****************************************** */

function filterHandler() {
  const filter = new Filter();
  const allFilters = filter.getAllElements();
  // select filters
  filter.filterShapeSeeker(toyShapeHandler);
  filter.filterColorSeeker(toyColorHandler);
  filter.filterSizeSeeker(toySizeHandler);
  filter.filterFavouriteSeeker(toyFavouriteHandler);

  // range filters
  filter.filterAmountSeeker(toyAmountHandler);
  filter.filterYearSeeker(toyYearHandler);

  // sorting
  filter.sortListSeeker(sortListAppearanceHandler);
  filter.sortOptionSeeker(sortOptionHandler);

  // searching
  filter.searchSeeker(searchHandler);

  // filter reset
  filter.resetFilterSeeker(filterResetHandler);
  filter.resetStorageSeeker(storageResetHandler);

  // pinner
  filter.pinnerSeeker(pinnerHandler);

  return allFilters;
}

function decoratorHandler() {
  const decorator = new Decorator();

  decorator.setStyles(dresserController.styleSetter);

  decorator.featureSoundSeeker(dresserController.featureSoundHandler);
  decorator.featureSnowSeeker(dresserController.featureSnowHandler);

  decorator.treeTypeSeeker(dresserController.treeTypeHandler);
  decorator.backgroundSeeker(dresserController.backgroundHandler);

  decorator.lightSwitchSeeker(dresserController.lightSwitchHandler);

  decorator.lightDefaultSeeker(dresserController.lightDefaultHandler);

  decorator.lightCustomOneSeeker(dresserController.lightCustomOneHandler);
  decorator.lightCustomManySeeker(dresserController.lightCustomManyHandler);

  decorator.lightBrightnessSeeker(dresserController.lightBrightnessHandler);
  decorator.lightSpeedSeeker(dresserController.lightSpeedHandler);

  decorator.lightBightnessOptionSeeker(dresserController.lightBrightnessOptionHandler);
  decorator.lightSpeedOptionSeeker(dresserController.lightSpeedOptionHandler);

  decorator.dragNDropSeeker(dresserController.dragNDropHandler);

  decorator.dresserClearSeeker(dresserController.storageReset);
}

/* seekers for filter page */
function filterViewHandler(el: HTMLElement, array: NodeListOf<HTMLElement>) {
  hideSearchField();
  linkIdleHandler(array, LINK_ACTIVE_CLASS);
  el.classList.add(LINK_ACTIVE_CLASS);
  filterView.render();
  const allFilters = filterHandler();
  stylesInit(allFilters);
  getFilteredToys();

  selectSearchFieldHandler();
}

/* seekers for decorator page */
function decoratorViewHandler(el: HTMLElement, array: NodeListOf<HTMLElement>) {
  hideSearchField();
  linkIdleHandler(array, LINK_ACTIVE_CLASS);
  el.classList.add(LINK_ACTIVE_CLASS);
  decoratorView.renderContent();
  decoratorView.renderToyList(() => dresserController.decorToyListRenderer(decoratorView));

  decoratorHandler();
}

/* initialization and navigation seekers */
init(navigator.filterLinks);
navigator.listenHeaderIcon(init);
navigator.listenHeaderLinks(filterViewHandler, decoratorViewHandler);
