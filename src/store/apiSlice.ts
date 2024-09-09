import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ResponseFilters,
  FilterParams,
  ResponseSpeedChart,
  ResponseCategoryChart,
  ResponseComments,
  ResponseKeyResults,
  ResponseResearch,
  ResponseOrgTree,
  ResponseAllComments,
  ResponseCompassCompare,
  ResponseOpenQuestions,
  ResponseIssues
} from 'types';
import mockData from './mockData.json';
const baseURL = window.location.origin;

const postUrl = (urlParams: string) => {
  return import.meta.env.DEV
    ? 'https://jsonplaceholder.typicode.com/posts'
    : baseURL +
        '/custom_web_template.html?custom_web_template_id=7065813553071256157' +
        urlParams;
};
const API_URL = import.meta.env.DEV
  ? 'https://jsonplaceholder.typicode.com/posts/1'
  : baseURL +
    '/custom_web_template.html?custom_web_template_id=7065813553071256157';

const urlBuilder = (params?: { [key: string]: any }) => {
  return {
    url: API_URL,
    params: { ...params }
  };
};

export const API = createApi({
  reducerPath: 'API',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllFiltersEngagementData: builder.query<
      ResponseFilters,
      { filters: FilterParams[] }
    >({
      query: ({ filters }) => ({
        url: postUrl('&action=getFilterEngagement'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseFilters) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseFilters =
            mockData.dataFiltersEngagement as ResponseFilters;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getAllFiltersCompassData: builder.query<
      ResponseFilters,
      { filters: FilterParams[] }
    >({
      query: ({ filters }) => ({
        url: postUrl('&action=getFilterCompassData'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseFilters) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseFilters =
            mockData.dataFiltersCompass as ResponseFilters;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getAllFiltersQuestionsData: builder.query<
      ResponseFilters,
      { filters: FilterParams[] }
    >({
      query: ({ filters }) => ({
        url: postUrl('&action=getFilterQuestion'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseFilters) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseFilters =
            mockData.dataFiltersQuestions as ResponseFilters;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getSpeedData: builder.query<
      ResponseSpeedChart,
      { filters: FilterParams[] }
    >({
      query: ({ filters }) => ({
        url: postUrl('&action=getSpeedData'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseSpeedChart) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseSpeedChart =
            mockData.dataSpeedChart as ResponseSpeedChart;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getCategoryData: builder.query<
      ResponseCategoryChart,
      { filters: FilterParams[] }
    >({
      query: ({ filters }) => ({
        url: postUrl('&action=getCircle'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseCategoryChart) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseCategoryChart =
            mockData.dataCategoryChart as ResponseCategoryChart;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getKeyResults: builder.query<
      ResponseKeyResults,
      { filters: FilterParams[] }
    >({
      query: ({ filters }) => ({
        url: postUrl('&action=getTableDataList'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseKeyResults) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseKeyResults =
            mockData.dataKeyResults as ResponseKeyResults;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getComments: builder.query<ResponseComments, { filters: FilterParams[] }>({
      query: ({ filters }) => ({
        url: postUrl('&action=getCommentList'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseComments) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseComments = mockData.dataComments;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getAllComments: builder.query<
      ResponseAllComments,
      { filters: FilterParams[]; id: string }
    >({
      query: ({ filters, id }) => ({
        url: postUrl('&action=getAllComment'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          id
        })
      }),
      transformResponse: (response: ResponseAllComments, _, arg) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseAllComments = {
            data:
              arg.id === '1'
                ? mockData.dataAllComments.data
                : mockData.dataAllComments2.data,
            isError: false,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1000);
          });
        } else {
          return response;
        }
      }
    }),
    getFiltersCompassResults: builder.query<ResponseFilters, void>({
      query: () => urlBuilder({ action: 'getFiltersCompassResults' }),
      transformResponse: (response: ResponseFilters) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseFilters =
            mockData.dataFiltersCompassResults as ResponseFilters;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 2000);
          });
        } else {
          return response;
        }
      }
    }),
    getResearchIssues: builder.query<
      ResponseResearch,
      { filters: FilterParams[] }
    >({
      query: ({ filters }) => ({
        url: postUrl('&action=getResearchIssues'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseResearch) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseResearch = {
            data: mockData.getResearchIssues.data,
            isError: false,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getResearchZones: builder.query<
      ResponseResearch,
      { filters: FilterParams[] }
    >({
      query: ({ filters }) => ({
        url: postUrl('&action=getResearchZones'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseResearch) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseResearch = mockData.getResearchZones;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 2000);
          });
        } else {
          return response;
        }
      }
    }),
    getOrgTree: builder.query<ResponseOrgTree, string | null>({
      query: (code) =>
        urlBuilder({
          action: 'getOrgTree',
          code
        }),
      transformResponse: (response: ResponseOrgTree, _, arg) => {
        if (import.meta.env.DEV) {
          let data = [];
          if (arg === '4') {
            data = mockData.getOrgTreeSelected.data;
          } else {
            data = mockData.getOrgTree.data;
          }
          const mockDataResponse: ResponseOrgTree = {
            data: data,
            isError: false,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 2000);
          });
        } else {
          return response;
        }
      }
    }),
    getResearchIssuesCompare: builder.query<
      ResponseCompassCompare,
      { filters: FilterParams[]; filtersCompare: FilterParams[] }
    >({
      query: ({ filters, filtersCompare }) => ({
        url: postUrl('&action=getResearchIssuesCompare'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          filtersCompare
        })
      }),
      transformResponse: (response: ResponseCompassCompare) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseCompassCompare = {
            data: mockData.getResearchIssuesCompare.data,
            isError: false,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getResearchZonesCompare: builder.query<
      ResponseCompassCompare,
      { filters: FilterParams[]; filtersCompare: FilterParams[] }
    >({
      query: ({ filters, filtersCompare }) => ({
        url: postUrl('&action=getResearchZonesCompare'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          filtersCompare
        })
      }),
      transformResponse: (response: ResponseCompassCompare) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseCompassCompare = {
            data: mockData.getResearchZonesCompare.data,
            isError: false,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1000);
          });
        } else {
          return response;
        }
      }
    }),
    getOpenQuestions: builder.query<
      ResponseOpenQuestions,
      { filters: FilterParams[] }
    >({
      query: ({ filters }) => ({
        url: postUrl('&action=getOpenQuestionAllList'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseOpenQuestions) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseOpenQuestions = {
            data: mockData.getOpenQuestions.data,
            isError: false,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1000);
          });
        } else {
          return response;
        }
      }
    }),
    getIssues: builder.query<ResponseIssues, { filters: FilterParams[] }>({
      query: ({ filters }) => ({
        url: postUrl('&action=getCommentProblemAllList'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseIssues) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseIssues = {
            data: mockData.getIssues.data,
            isError: false,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1000);
          });
        } else {
          return response;
        }
      }
    }),
    getAllQuestionsComments: builder.query<
      ResponseAllComments,
      { filters: FilterParams[]; id: string }
    >({
      query: ({ filters, id }) => ({
        url: postUrl('&action=getOpenQuestionListByQuestion'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          id
        })
      }),
      transformResponse: (response: ResponseAllComments, _, arg) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseAllComments = {
            data:
              arg.id === '1'
                ? mockData.dataAllComments.data
                : mockData.dataAllComments2.data,
            isError: true,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1000);
          });
        } else {
          return response;
        }
      }
    }),
    getAllIssuesComments: builder.query<
      ResponseAllComments,
      { filters: FilterParams[]; id: string }
    >({
      query: ({ filters, id }) => ({
        url: postUrl('&action=getCommentProblemListByProblem'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          id
        })
      }),
      transformResponse: (response: ResponseAllComments) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseAllComments =
            mockData.dataAllComments;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    })
  })
});

export const {
  useGetAllFiltersEngagementDataQuery,
  useGetAllFiltersCompassDataQuery,
  useGetAllFiltersQuestionsDataQuery,
  useLazyGetSpeedDataQuery,
  useLazyGetCategoryDataQuery,
  useLazyGetCommentsQuery,
  useLazyGetKeyResultsQuery,
  useLazyGetAllCommentsQuery,
  useGetFiltersCompassResultsQuery,
  useLazyGetResearchIssuesQuery,
  useLazyGetResearchZonesQuery,
  useLazyGetOrgTreeQuery,
  useGetOrgTreeQuery,
  useLazyGetResearchIssuesCompareQuery,
  useLazyGetResearchZonesCompareQuery,
  useLazyGetOpenQuestionsQuery,
  useLazyGetAllQuestionsCommentsQuery,
  useLazyGetIssuesQuery,
  useLazyGetAllIssuesCommentsQuery
} = API;
