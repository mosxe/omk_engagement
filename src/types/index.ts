export interface Error {
  isError: boolean;
  errorMessage: string;
}

export type Tab = 'engagement' | 'compass' | 'questions';

export type FilterName =
  | 'group'
  | 'subs'
  | 'city'
  | 'category'
  | 'sex'
  | 'experience'
  | 'problems'
  | 'strong_point';

export interface Filter {
  value: string;
  label: string;
}

export interface Filters {
  name: FilterName;
  value: Filter[];
}

export interface ResponseFilters extends Error {
  filters: Filters[];
  defaultSubCode: string;
}
