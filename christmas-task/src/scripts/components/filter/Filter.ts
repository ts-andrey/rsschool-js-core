import { IFilters } from './IFilters';
export class Filter {
  shapeFilters: NodeListOf<HTMLElement>;
  colorFilters: NodeListOf<HTMLElement>;
  sizeFilters: NodeListOf<HTMLElement>;
  favouriteFilter: HTMLElement;

  amountFilters: NodeListOf<HTMLInputElement>;
  minAmountBox: HTMLElement;
  maxAmountBox: HTMLElement;
  amountBackEl: HTMLElement;

  yearFilters: NodeListOf<HTMLInputElement>;
  minYearBox: HTMLElement;
  maxYearBox: HTMLElement;
  yearBackEl: HTMLElement;

  sortOptionList: HTMLElement;
  sortOptions: NodeListOf<HTMLElement>;
  sortValueWrapper: HTMLElement;
  sortValue: HTMLElement;

  searchElement: HTMLInputElement;

  filterReset: HTMLElement;
  storageReset: HTMLElement;

  pinner: HTMLElement;
  filterMenu: HTMLElement;

  constructor() {
    this.shapeFilters = document.querySelectorAll('.shape-list__item');
    this.colorFilters = document.querySelectorAll('.color-list__item');
    this.sizeFilters = document.querySelectorAll('.size-list__item');
    this.favouriteFilter = document.querySelector('.favourite-list__item');

    this.amountFilters = document.querySelectorAll('.range-filter__input_type_num');
    this.minAmountBox = document.querySelector('.range-filter__value_num_min');
    this.maxAmountBox = document.querySelector('.range-filter__value_num_max');
    this.amountBackEl = document.querySelector('.range-filter__range-background_type_num');

    this.yearFilters = document.querySelectorAll('.range-filter__input_type_year');
    this.minYearBox = document.querySelector('.range-filter__value_year_min');
    this.maxYearBox = document.querySelector('.range-filter__value_year_max');
    this.yearBackEl = document.querySelector('.range-filter__range-background_type_year');

    this.sortOptionList = document.querySelector('.sorter__sort-list');
    this.sortOptions = document.querySelectorAll('.sort-list__item');

    this.sortValueWrapper = document.querySelector('.sorter__sort-value-wrapper');
    this.sortValue = document.querySelector('.sorter__sort-value');

    this.searchElement = document.querySelector('.search-box__field');

    this.filterReset = document.querySelector('.sorter__reset-filters');
    this.storageReset = document.querySelector('.sorter__reset-storage');

    this.pinner = document.querySelector('.main-box__pinner');
    this.filterMenu = document.querySelector('.main-box__filters-wrapper');
  }

  filterShapeSeeker(shapeHandler: (shapeFilter: HTMLElement) => void) {
    this.shapeFilters.forEach(el => {
      el.addEventListener('click', () => {
        return shapeHandler(el);
      });
    });
  }
  filterColorSeeker(colorHandler: (colorFilter: HTMLElement) => void) {
    this.colorFilters.forEach(el => {
      el.addEventListener('click', () => {
        return colorHandler(el);
      });
    });
  }
  filterSizeSeeker(sizeHandler: (sizeFilter: HTMLElement) => void) {
    this.sizeFilters.forEach(el => {
      el.addEventListener('click', () => {
        return sizeHandler(el);
      });
    });
  }

  filterFavouriteSeeker(favouriteHandler: (favouriteFilter: HTMLElement) => void) {
    this.favouriteFilter.addEventListener('click', () => {
      return favouriteHandler(this.favouriteFilter);
    });
  }

  filterAmountSeeker(
    amountSeeker: (
      minValueBoxEl: HTMLElement,
      maxValueBoxEl: HTMLElement,
      amountFilters: NodeListOf<HTMLInputElement> | HTMLInputElement[],
      backgroundEl: HTMLElement
    ) => void
  ) {
    this.amountFilters.forEach(el => {
      el.addEventListener('change', () => {
        return amountSeeker(this.minAmountBox, this.maxAmountBox, this.amountFilters, this.amountBackEl);
      });
    });
  }
  filterYearSeeker(
    amountSeeker: (
      minValueBoxEl: HTMLElement,
      maxValueBoxEl: HTMLElement,
      yearFilters: NodeListOf<HTMLInputElement> | HTMLInputElement[],
      backgroundEl: HTMLElement
    ) => void
  ) {
    this.yearFilters.forEach(el => {
      el.addEventListener('change', () => {
        return amountSeeker(this.minYearBox, this.maxYearBox, this.yearFilters, this.yearBackEl);
      });
    });
  }

  sortListSeeker(sortValHandler: (sortListEL: HTMLElement) => void) {
    this.sortValueWrapper.addEventListener('click', () => {
      return sortValHandler(this.sortOptionList);
    });
  }

  sortOptionSeeker(
    sortOptionHandler: (shownSortOption: HTMLElement, sortOption: HTMLElement, sortOptions: HTMLElement) => void
  ) {
    this.sortOptions.forEach(el => {
      el.addEventListener('click', () => {
        return sortOptionHandler(this.sortValue, el, this.sortOptionList);
      });
    });
  }

  getAllElements() {
    return {
      shape: this.shapeFilters,
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
      sorting: {
        curOption: this.sortValue,
        allOptions: this.sortOptions,
      },
    };
  }

  resetFilterSeeker(resetHandler: (allElements: IFilters) => void) {
    this.filterReset.addEventListener('click', () => {
      return resetHandler(this.getAllElements());
    });
  }

  resetStorageSeeker(resetHandler: () => void) {
    this.storageReset.addEventListener('click', () => {
      return resetHandler();
    });
  }
  searchSeeker(searchHandler: (searchField: HTMLElement) => void) {
    this.searchElement.addEventListener('input', () => {
      return searchHandler(this.searchElement);
    });
  }

  pinnerSeeker(pinnerHandler: (pinner: HTMLElement, filtersMenu: HTMLElement) => void) {
    this.pinner.addEventListener('click', () => {
      return pinnerHandler(this.pinner, this.filterMenu);
    });
  }
}
