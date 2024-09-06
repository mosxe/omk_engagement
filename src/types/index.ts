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
  | 'strong_point'
  | 'year';

export interface Filter {
  value: string;
  label: string;
}

export interface Filters {
  name: FilterName;
  value: Filter[];
}

export interface ResponseFilters extends Error {
  data: Filters[];
}

export interface FilterParams {
  name: FilterName;
  value: string[] | number[];
}

export interface SpeedChart {
  code: string;
  name: string;
  year: string;
  percent: number;
  is_be: boolean;
}

export interface ResponseSpeedChart extends Error {
  data: SpeedChart[];
}
export interface CategoryChart {
  name: string;
  value: number;
}

export interface ResponseCategoryChart extends Error {
  data: CategoryChart[];
}

export interface Comments {
  id: string;
  title: string;
  is_all: boolean;
  comments: string[];
}

export interface ResponseComments extends Error {
  data: Comments[];
}

export interface KeyResult {
  name: string;
  persent: number;
  periodicity: number;
}

export interface KeyResults {
  general: KeyResult[];
  local: KeyResult[];
}

export interface DataKeyResults {
  negative: KeyResults;
  positive: KeyResults;
}

export interface ResponseKeyResults extends Error {
  data: DataKeyResults;
}

export interface ResponseAllComments extends Error {
  data: {
    title: string;
    comments: string[];
  };
}

export interface ResponseResearch extends Error {
  data: {
    main: KeyResult[];
    additional: KeyResult[];
  };
}

export interface ResponseOrgTree extends Error {
  data: OrgTree[];
}

export interface OrgTree {
  key: string;
  value: string;
  title: string;
  parent_object_code: string;
  children: OrgTree[];
  isLeaf: boolean;
}
