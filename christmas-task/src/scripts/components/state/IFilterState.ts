export interface IFilterState {
  [id: string]: string[] | boolean | string;
  shape: string[];
  color: string[];
  size: string[];
  favourite: boolean;
  amount: string[];
  year: string[];
  sortType: string;
  toysPick: string[];
}

export interface IFilterStateStorage {
  filterState: IFilterState;
  setFilterState: (obj: object) => void;
  resetFilterState: () => void;
  resetFilterStateAll: () => void;
}
