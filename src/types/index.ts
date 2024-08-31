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
  filters: Filters[];
}

export interface FilterParams {
  name: FilterName;
  value: string[] | number[];
}

export interface SpeedChartItem {
  year: string;
  percent: number;
}

export interface SpeedChart {
  sub: string;
  is_matching: boolean;
  data: SpeedChartItem[];
}

export interface ResponseSpeedChart extends Error {
  data: SpeedChart[];
}
export interface CategoryChart {
  name: string;
  percent: number;
}

export interface ResponseCategoryChart extends Error {
  data: CategoryChart[];
}

export interface CommentItem {
  id: string | number;
  text: string;
  person_name: string;
  position_name: string;
}

export interface Comments {
  data: CommentItem[];
  problem: string;
}

export interface ResponseComments extends Error {
  zones: Comments;
  issues: Comments;
}

export interface KeyResult {
  name: string;
  procent: number;
  frequency: number;
}

export interface KeyResults {
  common: KeyResult[];
  subdivision: KeyResult[];
}

export interface ResponseKeyResults extends Error {
  data_problems: KeyResults;
  data_zones: KeyResults;
}

export interface ResponseAllComments extends Error {
  data: CommentItem[];
  problem: string;
}

export interface ResponseResearch extends Error {
  data: {
    main: KeyResult[];
    additional: KeyResult[];
  };
}
