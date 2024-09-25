import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tab, Filters, QuestionsTab, OrgTree } from 'types';

export interface IFiltersState {
  selectedFilters: {
    engagement: Filters[];
    compass: Filters[];
    questions: Filters[];
    issues: Filters[];
  };
  subs: {
    engagement: OrgTree[];
    compass: OrgTree[];
    questions: OrgTree[];
    issues: OrgTree[];
  };
  selectedSubs: {
    engagement: string[];
    compass: string[];
    questions: string[];
    issues: string[];
  };
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
  subs: {
    engagement: [],
    compass: [],
    questions: [],
    issues: []
  },
  selectedSubs: {
    engagement: [],
    compass: [],
    questions: [],
    issues: []
  },
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
    },
    setSubs: (state, action: PayloadAction<OrgTree[]>) => {
      state.subs.engagement = action.payload;
      state.subs.compass = action.payload;
      state.subs.questions = action.payload;
      state.subs.issues = action.payload;
    },
    updateSubs: (
      state,
      action: PayloadAction<{ tab: Tab; data: OrgTree[] }>
    ) => {
      state.subs[action.payload.tab] = action.payload.data;
    },
    setDefaultSelectedSubs: (state, action: PayloadAction<string[]>) => {
      state.selectedSubs.engagement = action.payload;
      state.selectedSubs.compass = action.payload;
      state.selectedSubs.questions = action.payload;
      state.selectedSubs.issues = action.payload;
    },
    setDefaultFilterSubs: (state, action: PayloadAction<Filters>) => {
      const filterEngagement = state.selectedFilters.engagement.find(
        (item) => item.name === 'subs'
      ) as Filters;
      const filterCompass = state.selectedFilters.compass.find(
        (item) => item.name === 'subs'
      ) as Filters;
      const filterQuestions = state.selectedFilters.questions.find(
        (item) => item.name === 'subs'
      ) as Filters;
      const filterIssues = state.selectedFilters.issues.find(
        (item) => item.name === 'subs'
      ) as Filters;

      filterEngagement.value = action.payload.value;
      filterCompass.value = action.payload.value;
      filterQuestions.value = action.payload.value;
      filterIssues.value = action.payload.value;
    },
    updateSelectedSubs: (
      state,
      action: PayloadAction<{ tab: Tab; data: string[] }>
    ) => {
      state.selectedSubs[action.payload.tab] = action.payload.data;
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
