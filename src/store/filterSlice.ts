import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tab, Filters, QuestionsTab, OrgTree } from 'types';

export interface IFiltersState {
  selectedFilters: Filters[];
  subs: OrgTree[];
  selectedSubs: string[];
  researchIssues: Filters[];
  researchZones: Filters[];
  researchTable: {
    questions: boolean;
    issues: boolean;
  };
  questionsTab: QuestionsTab;
  respondents: {
    engagement: number | undefined;
    compass: number | undefined;
    questions: number | undefined;
    issues: number | undefined;
  };
}

const initialState: IFiltersState = {
  selectedFilters: [
    {
      name: 'group',
      value: []
    },
    {
      name: 'subs',
      value: []
    },
    {
      name: 'city',
      value: []
    },
    {
      name: 'category',
      value: []
    },
    {
      name: 'sex',
      value: []
    },
    {
      name: 'experience',
      value: []
    },
    {
      name: 'strong_point',
      value: []
    },
    {
      name: 'age',
      value: []
    },
    {
      name: 'open_question',
      value: []
    },
    {
      name: 'problems',
      value: []
    }
  ],
  researchIssues: [
    {
      name: 'subs',
      value: []
    },
    {
      name: 'year',
      value: []
    }
  ],
  researchZones: [
    {
      name: 'subs',
      value: []
    },
    {
      name: 'year',
      value: []
    }
  ],
  subs: [],
  selectedSubs: [],
  researchTable: {
    questions: false,
    issues: false
  },
  questionsTab: 'questions',
  respondents: {
    engagement: undefined,
    compass: undefined,
    questions: undefined,
    issues: undefined
  }
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSelectedFilters: (
      state,
      action: PayloadAction<{ tab: Tab; data: Filters }>
    ) => {
      const filter = state.selectedFilters.find(
        (item) => item.name === action.payload.data.name
      );
      if (filter !== undefined) {
        filter.value = action.payload.data.value;
      }
    },
    clearSelectedFilters: (state) => {
      state.selectedFilters.forEach((filter) => (filter.value = []));
    },
    updateResearchIssuesFilters: (state, action: PayloadAction<Filters>) => {
      const filter = state.researchIssues.find(
        (filter) => filter.name === action.payload.name
      );
      if (filter) {
        filter.value = action.payload.value;
      }
    },
    clearResearchIssuesFilters: (state) => {
      state.researchIssues.forEach((filter) => (filter.value = []));
    },
    updateResearchZonesFilters: (state, action: PayloadAction<Filters>) => {
      const filter = state.researchZones.find(
        (filter) => filter.name === action.payload.name
      );
      if (filter) {
        filter.value = action.payload.value;
      }
    },
    clearResearchZonesFilters: (state) => {
      state.researchZones.forEach((filter) => (filter.value = []));
    },
    changeQuestionsTab: (state, action: PayloadAction<QuestionsTab>) => {
      state.questionsTab = action.payload;
    },
    setSubs: (state, action: PayloadAction<OrgTree[]>) => {
      state.subs = action.payload;
    },
    updateSubs: (
      state,
      action: PayloadAction<{ tab: Tab; data: OrgTree[] }>
    ) => {
      state.subs = action.payload.data;
    },
    setDefaultSelectedSubs: (state, action: PayloadAction<string[]>) => {
      state.selectedSubs = action.payload;
    },
    setDefaultFilterSubs: (state, action: PayloadAction<Filters>) => {
      const filterSubs = state.selectedFilters.find(
        (item) => item.name === 'subs'
      ) as Filters;
      filterSubs.value = action.payload.value;
    },
    updateSelectedSubs: (
      state,
      action: PayloadAction<{ tab: Tab; data: string[] }>
    ) => {
      state.selectedSubs = action.payload.data;
    },
    changeShowResearchTable: (
      state,
      action: PayloadAction<{ tab: 'questions' | 'issues'; isShow: boolean }>
    ) => {
      state.researchTable[action.payload.tab] = action.payload.isShow;
    },
    updateCountRespondents: (
      state,
      action: PayloadAction<{ tab: Tab; data: number }>
    ) => {
      state.respondents[action.payload.tab] = action.payload.data;
    }
  }
});

export const {
  updateSelectedFilters,
  clearSelectedFilters,
  updateResearchIssuesFilters,
  clearResearchIssuesFilters,
  updateResearchZonesFilters,
  clearResearchZonesFilters,
  changeQuestionsTab,
  setSubs,
  updateSubs,
  updateSelectedSubs,
  setDefaultSelectedSubs,
  setDefaultFilterSubs,
  changeShowResearchTable,
  updateCountRespondents
} = filtersSlice.actions;

export default filtersSlice.reducer;
