import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tab, Filters } from 'types';

export interface IFiltersState {
  selectedFilters: {
    [key in Partial<Tab>]: Filters[];
  };
  researchIssues: Filters[];
  researchZones: Filters[];
}

const initialState: IFiltersState = {
  selectedFilters: {
    engagement: [
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
      }
    ],
    compass: [
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
        name: 'problems',
        value: []
      },
      {
        name: 'strong_point',
        value: []
      },
      {
        name: 'age',
        value: []
      }
    ],
    questions: []
  },
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
  ]
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSelectedFilters: (
      state,
      action: PayloadAction<{ tab: Tab; data: Filters }>
    ) => {
      const tabData = state.selectedFilters[action.payload.tab];
      const filter = tabData.find(
        (item) => item.name === action.payload.data.name
      );

      if (filter !== undefined) {
        filter.value = action.payload.data.value;
      }
    },
    clearSelectedFilters: (state, action: PayloadAction<{ tab: Tab }>) => {
      state.selectedFilters[action.payload.tab].forEach(
        (filter) => (filter.value = [])
      );
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
    }
  }
});

export const {
  updateSelectedFilters,
  clearSelectedFilters,
  updateResearchIssuesFilters,
  clearResearchIssuesFilters,
  updateResearchZonesFilters,
  clearResearchZonesFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
