export interface IFilters {
  shape: NodeListOf<HTMLElement>;
  color: NodeListOf<HTMLElement>;
  size: NodeListOf<HTMLElement>;
  favourite: HTMLElement;
  amount: {
    minBox: HTMLElement;
    maxBox: HTMLElement;
    background: HTMLElement;
    filters: NodeListOf<HTMLInputElement> | HTMLInputElement[];
  };
  year: {
    minBox: HTMLElement;
    maxBox: HTMLElement;
    background: HTMLElement;
    filters: NodeListOf<HTMLInputElement> | HTMLInputElement[];
  };
  sorting: {
    curOption: HTMLElement;
    allOptions: NodeListOf<HTMLElement>;
  };
}

export interface IFiltersObj {
  obj: {
    shape: NodeListOf<HTMLElement>;
    color: NodeListOf<HTMLElement>;
    size: NodeListOf<HTMLElement>;
    favourite: HTMLElement;
    amount: {
      minBox: HTMLElement;
      maxBox: HTMLElement;
      background: HTMLElement;
      filters: HTMLInputElement[];
    };
    year: {
      minBox: HTMLElement;
      maxBox: HTMLElement;
      background: HTMLElement;
      filters: HTMLInputElement[];
    };
    sorting: {
      curOption: HTMLElement;
      allOptions: NodeListOf<HTMLElement>;
    };
  };
}
