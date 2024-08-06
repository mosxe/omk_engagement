import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { Role, Tags, IDataItem } from 'types';
import { filteringDataTags } from './helps';

interface filtersState {
  nav: Role;
  selectedTags: {
    [key in Partial<Role>]: Tags;
  };
  filteredData: {
    [key in Partial<Role>]: {
      dataProcess: IDataItem[];
      dataWorking: IDataItem[];
      dataInterview: IDataItem[];
      isActive: boolean;
    };
  };
}

const initialState: filtersState = {
  nav: 'manager',
  selectedTags: {
    guest: [],
    hr_bp: [],
    manager: [],
    recruiter: []
  },
  filteredData: {
    guest: {
      dataProcess: [],
      dataWorking: [],
      dataInterview: [],
      isActive: false
    },
    hr_bp: {
      dataProcess: [],
      dataWorking: [],
      dataInterview: [],
      isActive: false
    },
    manager: {
      dataProcess: [],
      dataWorking: [],
      dataInterview: [],
      isActive: false
    },
    recruiter: {
      dataProcess: [],
      dataWorking: [],
      dataInterview: [],
      isActive: false
    }
  }
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateNav: (state, action: PayloadAction<Role>) => {
      state.nav = action.payload;
    },
    updateSelectedTags: (
      state,
      action: PayloadAction<{ label: string; isChecked: boolean }>
    ) => {
      const selectedTagsRole = state.selectedTags[state.nav];
      if (action.payload.isChecked) {
        state.selectedTags[state.nav] = [
          ...selectedTagsRole,
          action.payload.label
        ];
      } else {
        const filteredSelectedTags = selectedTagsRole.filter(
          (selectedTag) => selectedTag !== action.payload.label
        );
        state.selectedTags[state.nav] = filteredSelectedTags;
      }
    },
    clearSelectedTags: (state) => {
      state.selectedTags[state.nav] = [];
    },
    filteringData: (
      state,
      action: PayloadAction<{
        data: {
          dataProcess: IDataItem[];
          dataWorking: IDataItem[];
          dataInterview: IDataItem[];
        };
        isActive: boolean;
      }>
    ) => {
      let tempDataProcess = action.payload.data.dataProcess;
      let tempDataWorking = action.payload.data.dataWorking;
      let tempDataInterview = action.payload.data.dataInterview;

      if (current(state.selectedTags[state.nav]).length > 0) {
        tempDataProcess = filteringDataTags(
          action.payload.data.dataProcess,
          current(state.selectedTags[state.nav])
        );
        tempDataWorking = filteringDataTags(
          action.payload.data.dataWorking,
          current(state.selectedTags[state.nav])
        );
        tempDataInterview = filteringDataTags(
          action.payload.data.dataInterview,
          current(state.selectedTags[state.nav])
        );
      }

      state.filteredData[state.nav] = {
        dataInterview: tempDataInterview,
        dataProcess: tempDataProcess,
        dataWorking: tempDataWorking,
        isActive: state.filteredData[state.nav].isActive
      };
    }
  }
});

export const {
  updateNav,
  updateSelectedTags,
  clearSelectedTags,
  filteringData
} = filtersSlice.actions;

export default filtersSlice.reducer;
