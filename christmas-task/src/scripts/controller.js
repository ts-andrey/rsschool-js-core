import { Data } from './components/data/Data';

import { HomeView } from './view/Home';
import { FilterView } from './view/Filter';
import { CardView } from './view/Card';
import { DecoratorView } from './view/Decorator';

import { Decorator } from './components/dresser/Decorator';
import { Filter } from './components/filter/Filter';
import { Card } from './components/card/Card';
import { Navigator } from './components/home/Navigator';

import toysArray from '../assets/data';

const LINK_ACTIVE_CLASS = 'nav-list__item_state_active';
const CARD_CHOSEN_CLASS = 'toy-card__mark_state_favourite';
const MAX_TOY_AMOUNT = 12;
const MIN_TOY_AMOUNT = 1;
const MAX_TOY_YEAR_VALUE = 2020;
const MIN_TOY_YEAR_VALUE = 1940;

const data = new Data(toysArray);

const decoratorView = new DecoratorView();
const filterView = new FilterView();
const homeView = new HomeView();

let decorator = new Decorator();

let navigator = new Navigator();

// default handler
function navigatorLinkUpdate() {
  navigator.homeLink = new Navigator().homeLink;
  navigator.listenFilter(filterViewHandler);
}

function getPercents(val) {
  let result;
  if (val < 13) {
    const diff = MAX_TOY_AMOUNT - MIN_TOY_AMOUNT;
    const tempVal = diff - (MAX_TOY_AMOUNT - val);
    result = tempVal * (100 / diff);
  } else {
    const diff = MAX_TOY_YEAR_VALUE - MIN_TOY_YEAR_VALUE;
    const tempVal = diff - (MAX_TOY_YEAR_VALUE - val);
    result = tempVal * (100 / diff);
  }
  return result;
}

/*  helperFunctions */
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
}

function linkIdleHandler(array, removeClass) {
  array.forEach(el => {
    el.classList.remove(removeClass);
  });
}

// init function
function init(array) {
  linkIdleHandler(array, LINK_ACTIVE_CLASS);
  homeView.render();
  navigatorLinkUpdate();
}

function toyCardsRenderer(array) {
  const cardView = new CardView();
  cardView.targetElement.innerHTML = '';
  if (array) {
    array.forEach(el => {
      new CardView(el).render();
    });
  } else {
    data.data.forEach(el => {
      new CardView(el).render();
    });
  }
  const card = new Card();
  card.cardsSeeker(cardHandler);
}

/* FILTER PAGE */
/*  handlers for filter seekers */

function toyShapeHandler(shape) {
  const array = data.filterByShape(shape);
  toyCardsRenderer(array);
}
function toyColorHandler(color, item, itemArray) {
  if (!item.classList.contains('itemIsChecked')) {
    item.innerText = '✓';
  } else {
    item.innerText = '';
  }
  item.classList.toggle('itemIsChecked');
  const array = data.filterByColor(color);
  toyCardsRenderer(array);
}
function toySizeHandler(size) {
  const array = data.filterBySize(size);
  toyCardsRenderer(array);
}
function toyFavouriteHandler(item) {
  if (!item.classList.contains('itemIsChecked')) {
    item.innerText = '✓';
    const array = data.filterFavourite('да');
    toyCardsRenderer(array);
  } else {
    item.innerText = '';
    toyCardsRenderer();
  }
  item.classList.toggle('itemIsChecked');
}

function toyAmountHandler(minBox, maxBox, [minVal, maxVal], backgroundEl) {
  rangeHandler(minBox, maxBox, [minVal, maxVal], backgroundEl);
  const array = data.filterByAmount(minBox.innerText, maxBox.innerText);
  toyCardsRenderer(array);
}
function toyYearHandler(minBox, maxBox, [minVal, maxVal], backgroundEl) {
  rangeHandler(minBox, maxBox, [minVal, maxVal], backgroundEl);
  const array = data.filterByYear(minBox.innerText, maxBox.innerText);
  toyCardsRenderer(array);
}

function sortListAppearanceHandler(element) {
  element.classList.toggle('sorter__sort-list_state_reveal');
}

function sortOptionHandler(curOptionElement, eventElement) {
  curOptionElement.innerText = eventElement.innerText;

  const sortOption = eventElement.getAttribute('data-sort-option');
  switch (sortOption) {
    case 'name': {
      const array = data.sortByName();
      toyCardsRenderer(array);
      break;
    }
    case 'name-reversed': {
      const array = data.sortByNameReversed();
      toyCardsRenderer(array);
      break;
    }
    case 'number': {
      const array = data.sortByNumber();
      toyCardsRenderer(array);
      break;
    }
    case 'number-reversed': {
      const array = data.sortByNumberReversed();
      toyCardsRenderer(array);
      break;
    }
  }
}

function filterHandler() {
  const filter = new Filter();
  filter.shapeFilterSeeker(toyShapeHandler);
  filter.colorFilterSeeker(toyColorHandler);
  filter.sizeFilterSeeker(toySizeHandler);
  filter.favouriteFilterSeeker(toyFavouriteHandler);

  filter.amountFilterSeeker(toyAmountHandler);
  filter.yearFilterSeeker(toyYearHandler);

  filter.sortListSeeker(sortListAppearanceHandler);
  filter.sortOptionSeeker(sortOptionHandler);
}

/* card handler */
function cardHandler(mark, toyList, toyPickCounter) {
  mark.classList.toggle(CARD_CHOSEN_CLASS);
  let counter = 0;
  toyList.forEach(el => {
    if (el.classList.contains(CARD_CHOSEN_CLASS)) {
      counter++;
    }
  });
  toyPickCounter.innerText = counter;
}

/* seekers for filter page */
function filterViewHandler(el, array) {
  linkIdleHandler(array, LINK_ACTIVE_CLASS);
  el.classList.add(LINK_ACTIVE_CLASS);
  filterView.render();
  filterHandler();
  toyCardsRenderer();
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
