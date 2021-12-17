export class Filter {
  constructor() {
    this.shapeFilters = document.querySelectorAll('.shape-list__item');
    this.colorFilters = document.querySelectorAll('.color-list__item');
    this.sizeFilters = document.querySelectorAll('.size-list__item');
    this.favouriteFilter = document.querySelector('.favourite-list__item');

    this.amountFilters = document.querySelectorAll('.range-filter__input_type_num');
    this.minAmount = document.querySelector('.range-filter__value_num_min');
    this.maxAmount = document.querySelector('.range-filter__value_num_max');

    this.yearFilters = document.querySelectorAll('.range-filter__input_type_year');
    this.minYear = document.querySelector('.range-filter__value_year_min');
    this.maxYear = document.querySelector('.range-filter__value_year_max');

    this.sortOptionList = document.querySelector('.sorter__sort-list');
    this.sortOptions = document.querySelectorAll('.sort-list__item');

    this.sortValueWrapper = document.querySelector('.sorter__sort-value-wrapper');
    this.sortValue = document.querySelector('.sorter__sort-value');

    this.filterReset = document.querySelector('.sorter__reset');
  }

  shapeFilterSeeker(shapeHandler) {
    this.shapeFilters.forEach(el => {
      el.addEventListener('click', () => {
        return shapeHandler(el.getAttribute('data-shape'));
      });
    });
  }
  colorFilterSeeker(colorHandler) {
    this.colorFilters.forEach(el => {
      el.addEventListener('click', () => {
        return colorHandler(el.getAttribute('data-color'), this.colorFilters);
      });
    });
  }
  sizeFilterSeeker(sizeHandler) {
    this.sizeFilters.forEach(el => {
      el.addEventListener('click', () => {
        return sizeHandler(el.getAttribute('data-size'));
      });
    });
  }

  favouriteFilterSeeker(favouriteHandler) {
    this.favouriteFilter.addEventListener('click', () => {
      favouriteHandler();
    });
  }

  amountFilterSeeker(amountSeeker) {
    this.amountFilters.forEach(el => {
      el.addEventListener('change', () => {
        amountSeeker(this.minAmount, this.maxAmount);
      });
    });
  }
  yearFilterSeeker(amountSeeker) {
    this.yearFilters.forEach(el => {
      el.addEventListener('change', () => {
        amountSeeker(this.minYear, this.maxYear);
      });
    });
  }

  sortListSeeker(sortValHandler) {
    this.sortValueWrapper.addEventListener('click', () => {
      return sortValHandler(this.sortOptionList);
    });
  }

  sortOptionSeeker(sortOptionHandler) {
    this.sortOptions.forEach(el => {
      el.addEventListener('click', () => {
        sortOptionHandler(this.sortValue, el);
      });
    });
  }

  filterResetSeeker(resetHandler) {
    this.filterReset.addEventListener('click', () => {
      return resetHandler;
    });
  }
}
