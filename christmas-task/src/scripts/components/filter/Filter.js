export class Filter {
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

    this.filterReset = document.querySelector('.sorter__reset');

    this.searchElement = document.querySelector('.search-box__field');
  }

  filterShapeSeeker(shapeHandler) {
    this.shapeFilters.forEach(el => {
      el.addEventListener('click', () => {
        return shapeHandler(el, this.shapeFilters);
      });
    });
  }
  filterColorSeeker(colorHandler) {
    this.colorFilters.forEach(el => {
      el.addEventListener('click', () => {
        return colorHandler(el.getAttribute('data-color'), el, this.colorFilters);
      });
    });
  }
  filterSizeSeeker(sizeHandler) {
    this.sizeFilters.forEach(el => {
      el.addEventListener('click', () => {
        return sizeHandler(el, this.sizeFilters);
      });
    });
  }

  filterFavouriteSeeker(favouriteHandler) {
    this.favouriteFilter.addEventListener('click', () => {
      return favouriteHandler(this.favouriteFilter);
    });
  }

  filterAmountSeeker(amountSeeker) {
    this.amountFilters.forEach(el => {
      el.addEventListener('change', () => {
        return amountSeeker(this.minAmountBox, this.maxAmountBox, this.amountFilters, this.amountBackEl);
      });
    });
  }
  filterYearSeeker(amountSeeker) {
    this.yearFilters.forEach(el => {
      el.addEventListener('change', () => {
        return amountSeeker(this.minYearBox, this.maxYearBox, this.yearFilters, this.yearBackEl);
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

  resetFilterSeeker(resetHandler) {
    this.filterReset.addEventListener('click', () => {
      return resetHandler(this.getAllElements);
    });
  }

  searchSeeker(searchHandler) {
    this.searchElement.addEventListener('input', () => {
      searchHandler(this.searchElement);
    });
  }
}
