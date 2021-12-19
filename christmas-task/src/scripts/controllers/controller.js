import { Data } from '../components/data/Data';

import { HomeView } from '../view/Home';
import { FilterView } from '../view/Filter';
import { CardView } from '../view/Card';
import { DecoratorView } from '../view/Decorator';

// import { Decorator } from '../components/dresser/Decorator';
import { Filter } from '../components/filter/Filter';
import { Card } from '../components/card/Card';
import { Navigator } from '../components/home/Navigator';

import { State } from '../components/state/State';

import toysArray from '../../assets/data';

const LINK_ACTIVE_CLASS = 'nav-list__item_state_active';
const CARD_CHOSEN_CLASS = 'toy-card__mark_state_favourite';
const FILTER_SOLE_ACTIVE_CLASS = 'filters__filter-type_state_active';
const FILTER_MULTIPLE_CHECKED_CLASS = 'itemIsChecked';
const TOY_AMOUN_MIN = 1;
const TOY_AMOUNT_MAX = 12;
const TOY_YEAR_VALUE_MIN = 1940;
const TOY_YEAR_VALUE_MAX = 2020;
const SORT_LIST_SHOW_CLASS = 'sorter__sort-list_state_reveal';

const FILTER_COLORS = ['белый', 'желтый', 'красный', 'синий', 'зелёный'];

// data - array with toys and info about them + filter/sort methods
const data = new Data(toysArray);

const decoratorView = new DecoratorView();
const filterView = new FilterView();
const homeView = new HomeView();

// let decorator = new Decorator();

let navigator = new Navigator();

const state = new State();
if (!localStorage.getItem('filterState')) {
  updateLocalStorage('filterState', state);
} else {
  state.setFilterState(JSON.parse(localStorage.getItem('filterState')));
}

// default handler
function navigatorLinkUpdate() {
  navigator.homeLink = new Navigator().homeLink;
  navigator.listenFilter(filterViewHandler);
}

// init function
function init(array) {
  linkIdleHandler(array, LINK_ACTIVE_CLASS);
  homeView.render();
  navigatorLinkUpdate();
  // set amount of picked toys
  const toyPickAmount = document.querySelector('.header-box__toy-counter');
  toyPickAmount.innerText = state.filterState.toysPick.length;
}

/*  helperFunctions */

function updateLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getPickedColors() {
  const result = [];
  state.filterState.color.forEach((el, index) => {
    if (el) {
      result.push(FILTER_COLORS[index]);
    }
  });
  return result;
}

function sortHelper(option, items) {
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
  }
}

function getFilteredToys(str) {
  let result = data.data;

  // step#1: filter by shape
  if (state.filterState.shape[0]) {
    result = data.filterByShape(state.filterState.shape[1], result);
  }

  // step#2: if there is any color filters -> filter toys by them
  const pickedColors = getPickedColors();
  result = data.filterByColor(pickedColors, result);
  // step#3: filter by size
  if (state.filterState.size[0]) {
    result = data.filterBySize(state.filterState.size[1], result);
  }
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
  // last_step: sort final pick by chosen option

  // search filtering if there any
  if (str) {
    result = result.filter(el => el.name.toLowerCase().includes(str.toLowerCase()));
  }

  return sortHelper(state.filterState.sortType, result);
}

function getPercents(val) {
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

function rangeHandler(minBox, maxBox, [minVal, maxVal], backgroundEl) {
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
  return [min, max];
}

function linkIdleHandler(array, removeClass) {
  array.forEach(el => {
    el.classList.remove(removeClass);
  });
}

function toyCardsRenderer(array) {
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

function classRemover(itemArray, className) {
  itemArray.forEach(el => {
    el.classList.remove(className);
  });
}

function textRemover(itemArray) {
  itemArray.forEach(el => {
    el.innerText = '';
  });
}

function soleFilterHandler(item, allItems, className) {
  const hasClass = item.classList.contains(className);
  classRemover(allItems, className);
  if (!hasClass) {
    item.classList.add(className);
    return true;
  }
  return false;
}

function setRangeStyle(allFilters, type) {
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
  rangeHandler(currTarget.minBox, currTarget.maxBox, currTarget.filters, currTarget.background);
}

function stylesReset(filters) {
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

/* shape: this.shapeFilters,
color: this.colorFilters,
size: this.sizeFilters,
favourite: this.favouriteFilter,
amount: {
  minBox: this.minAmountBox,
  maxBox: this.maxAmountBox,
  background: this.amountBackEl,
  filters: this.amountFilters,
},
year: {
  minBox: this.minYearBox,
  maxBox: this.maxYearBox,
  background: this.yearBackEl,
  filters: this.yearFilters,
},
sort: {
  curOption: this.sortValue,
  allOptions: this.sortOptions,
},
*/

function stylesInit(filters) {
  // set shape styles
  if (state.filterState.shape[0]) {
    filters.shape.forEach(el => {
      if (el.getAttribute('data-shape') === state.filterState.shape[1]) {
        el.classList.add(FILTER_SOLE_ACTIVE_CLASS);
      }
    });
  }

  // set color styles
  if (state.filterState.color.includes(true)) {
    filters.color.forEach((el, index) => {
      if (state.filterState.color[index]) {
        el.classList.add(FILTER_MULTIPLE_CHECKED_CLASS);
        el.innerText = '✓';
      }
    });
  }

  // set size styles
  if (state.filterState.size[0]) {
    filters.size.forEach(el => {
      if (el.getAttribute('data-size') === state.filterState.size[1]) {
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

/* FILTER PAGE */
/*  handlers for filter seekers */

function toyShapeHandler(item, allItems) {
  const hasFilter = soleFilterHandler(item, allItems, FILTER_SOLE_ACTIVE_CLASS);
  state.filterState.shape = [hasFilter, item.getAttribute('data-shape')];
  getFilteredToys();
  updateLocalStorage('filterState', state);
}

function toyColorHandler(color, item) {
  const colorNum = FILTER_COLORS.indexOf(color);
  if (!item.classList.contains(FILTER_MULTIPLE_CHECKED_CLASS)) {
    item.innerText = '✓';
    state.filterState.color[colorNum] = true;
  } else {
    item.innerText = '';
    state.filterState.color[colorNum] = false;
  }
  item.classList.toggle(FILTER_MULTIPLE_CHECKED_CLASS);
  getFilteredToys();
  updateLocalStorage('filterState', state);
}
function toySizeHandler(item, allItems) {
  const hasFilter = soleFilterHandler(item, allItems, FILTER_SOLE_ACTIVE_CLASS);
  state.filterState.size = [hasFilter, item.getAttribute('data-size')];
  getFilteredToys();
  updateLocalStorage('filterState', state);
}
function toyFavouriteHandler(item) {
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

function toyAmountHandler(minBox, maxBox, [minVal, maxVal], backgroundEl) {
  const result = rangeHandler(minBox, maxBox, [minVal, maxVal], backgroundEl);
  state.filterState.amount = result;
  getFilteredToys();
  updateLocalStorage('filterState', state);
}
function toyYearHandler(minBox, maxBox, [minVal, maxVal], backgroundEl) {
  const result = rangeHandler(minBox, maxBox, [minVal, maxVal], backgroundEl);
  state.filterState.year = result;
  getFilteredToys();
  updateLocalStorage('filterState', state);
}

function sortListAppearanceHandler(element) {
  element.classList.toggle(SORT_LIST_SHOW_CLASS);
}

function sortOptionHandler(curOptionElement, eventElement, sortList) {
  curOptionElement.innerText = eventElement.innerText;
  const sortOption = eventElement.getAttribute('data-sort-option');

  state.filterState.sortType = sortOption;
  sortList.classList.remove(SORT_LIST_SHOW_CLASS);
  getFilteredToys();
  updateLocalStorage('filterState', state);
}

function searchHandler(el) {
  getFilteredToys(el.value);
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
  return allFilters;
}

/* card handler */
function cardHandler(mark, toyPickCounter, element) {
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
    toyPickCounter.innerText = state.filterState.toysPick.length;
    updateLocalStorage('filterState', state);
  }
}

/* seekers for filter page */
function filterViewHandler(el, array) {
  linkIdleHandler(array, LINK_ACTIVE_CLASS);
  el.classList.add(LINK_ACTIVE_CLASS);
  filterView.render();
  const allFilters = filterHandler();
  stylesInit(allFilters);
  getFilteredToys();
}

/* seekers for decorator page */
function decoratorViewHandler(el, array) {
  linkIdleHandler(array, LINK_ACTIVE_CLASS);
  el.classList.add(LINK_ACTIVE_CLASS);
  decoratorView.render();
}

/* initialization and navigation seekers */
init(navigator.filterLinks);
navigator.listenIcon(init);
navigator.listenLinks(filterViewHandler, decoratorViewHandler);
