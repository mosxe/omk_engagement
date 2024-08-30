import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tab, Filters } from 'types';
// import { filteringDataTags } from './helps';

export interface IFiltersState {
  selectedFilters: {
    [key in Partial<Tab>]: Filters[];
  };
  // filteredData: {
  //   [key in Partial<Role>]: {
  //     dataProcess: IDataItem[];
  //     dataWorking: IDataItem[];
  //     dataInterview: IDataItem[];
  //     isActive: boolean;
  //   };
  // };
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
      }
    ],
    questions: []
  }
  // filteredData: {
  //   guest: {
  //     dataProcess: [],
  //     dataWorking: [],
  //     dataInterview: [],
  //     isActive: false
  //   },
  //   hr_bp: {
  //     dataProcess: [],
  //     dataWorking: [],
  //     dataInterview: [],
  //     isActive: false
  //   },
  //   manager: {
  //     dataProcess: [],
  //     dataWorking: [],
  //     dataInterview: [],
  //     isActive: false
  //   },
  //   recruiter: {
  //     dataProcess: [],
  //     dataWorking: [],
  //     dataInterview: [],
  //     isActive: false
  //   }
  // }
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSelectedFilters: (
      state,
      action: PayloadAction<{ tab: Tab; data: Filters }>
    ) => {
      // console.log(action);
      // console.log(action.payload.data.name);
      // console.log(action.payload.data.value);
      const tabData = state.selectedFilters[action.payload.tab];
      const filter = tabData.find(
        (item) => item.name === action.payload.data.name
      );

      if (filter !== undefined) {
        filter.value = action.payload.data.value;
      }
      // const selectedTagsRole = state.selectedTags[state.nav];
      // if (action.payload.isChecked) {
      //   state.selectedTags[state.nav] = [
      //     ...selectedTagsRole,
      //     action.payload.label
      //   ];
      // } else {
      //   const filteredSelectedTags = selectedTagsRole.filter(
      //     (selectedTag) => selectedTag !== action.payload.label
      //   );
      //   state.selectedTags[state.nav] = filteredSelectedTags;
      // }
    },
    clearSelectedFilters: (state, action: PayloadAction<{ tab: Tab }>) => {
      console.log(action.payload.tab);
      state.selectedFilters[action.payload.tab].forEach(
        (filter) => (filter.value = [])
      );
      // const filter = tabData.find(
      //   (item) => item.name === action.payload.data.name
      // );

      // if (filter !== undefined) {
      //   filter.value = action.payload.data.value;
      // }
      // const selectedTagsRole = state.selectedTags[state.nav];
      // if (action.payload.isChecked) {
      //   state.selectedTags[state.nav] = [
      //     ...selectedTagsRole,
      //     action.payload.label
      //   ];
      // } else {
      //   const filteredSelectedTags = selectedTagsRole.filter(
      //     (selectedTag) => selectedTag !== action.payload.label
      //   );
      //   state.selectedTags[state.nav] = filteredSelectedTags;
      // }
    }
    // clearSelectedTags: (state) => {
    //   state.selectedTags[state.nav] = [];
    // },
    // filteringData: (
    //   state,
    //   action: PayloadAction<{
    //     data: {
    //       dataProcess: IDataItem[];
    //       dataWorking: IDataItem[];
    //       dataInterview: IDataItem[];
    //     };
    //     isActive: boolean;
    //   }>
    // ) => {
    //   let tempDataProcess = action.payload.data.dataProcess;
    //   let tempDataWorking = action.payload.data.dataWorking;
    //   let tempDataInterview = action.payload.data.dataInterview;

    //   if (current(state.selectedTags[state.nav]).length > 0) {
    //     tempDataProcess = filteringDataTags(
    //       action.payload.data.dataProcess,
    //       current(state.selectedTags[state.nav])
    //     );
    //     tempDataWorking = filteringDataTags(
    //       action.payload.data.dataWorking,
    //       current(state.selectedTags[state.nav])
    //     );
    //     tempDataInterview = filteringDataTags(
    //       action.payload.data.dataInterview,
    //       current(state.selectedTags[state.nav])
    //     );
    //   }

    //   state.filteredData[state.nav] = {
    //     dataInterview: tempDataInterview,
    //     dataProcess: tempDataProcess,
    //     dataWorking: tempDataWorking,
    //     isActive: state.filteredData[state.nav].isActive
    //   };
    // }
  }
});

export const { updateSelectedFilters, clearSelectedFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
