import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tab, Filters, QuestionsTab } from 'types';

export interface IFiltersState {
  selectedFilters: {
    engagement: Filters[];
    compass: Filters[];
    questions: Filters[];
    issues: Filters[];
  };
  researchIssues: Filters[];
  researchZones: Filters[];
  questionsTab: QuestionsTab;
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
    questions: [
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
        name: 'open_question',
        value: []
      }
    ],
    issues: [
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
      }
    ]
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
  ],
  questionsTab: 'questions'
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
    },
    changeQuestionsTab: (state, action: PayloadAction<QuestionsTab>) => {
      state.questionsTab = action.payload;
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
  changeQuestionsTab
} = filtersSlice.actions;

export default filtersSlice.reducer;
