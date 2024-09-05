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
  ResponseAllComments
} from 'types';
import mockData from './mockData.json';
const baseURL = window.location.origin;

// RANDOM в параметрах нужно будет удалить перед билдом на прод!!!!!!
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
    getFilterEngagementData: builder.query<
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
            mockData.dataEngagement as ResponseFilters;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    }),
    getFilterCompassData: builder.query<
      ResponseFilters,
      { filters: FilterParams[]; is_starting: boolean }
    >({
      query: ({ filters, is_starting }) => ({
        url: postUrl('&action=getFilterCompassData'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          is_starting
        })
      }),
      transformResponse: (response: ResponseFilters, _, arg) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseFilters = arg.is_starting
            ? (mockData.dataCompass as ResponseFilters)
            : (mockData.dataUpdateCompass as ResponseFilters);
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
        url: postUrl('&action=getComments'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters
        })
      }),
      transformResponse: (response: ResponseComments) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseComments = {
            data: mockData.dataComments.data,
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
    getAllComments: builder.query<
      ResponseAllComments,
      { filters: FilterParams[]; id: string }
    >({
      query: ({ filters, id }) => ({
        url: postUrl('&action=getAllComments'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          id
        })
      }),
      transformResponse: (response: ResponseAllComments, meta, arg) => {
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
    getFiltersCompassResults: builder.query<ResponseFilters, void>({
      query: () => urlBuilder({ actin: 'getFiltersCompassResults' }),
      transformResponse: (response: ResponseFilters) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseFilters =
            mockData.dataFiltersCompassResults as ResponseFilters;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
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
            data: mockData.getResearchIssues.data as any,
            isError: false,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 5000);
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
          const mockDataResponse: ResponseResearch = {
            data: mockData.getResearchIssues.data as any,
            isError: false,
            errorMessage: ''
          };
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 5000);
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
  useGetFilterEngagementDataQuery,
  useLazyGetFilterEngagementDataQuery,
  useLazyGetFilterCompassDataQuery,
  useLazyGetSpeedDataQuery,
  useLazyGetCategoryDataQuery,
  useLazyGetCommentsQuery,
  useLazyGetKeyResultsQuery,
  useLazyGetAllCommentsQuery,
  useGetAllFiltersEngagementDataQuery,
  useGetFiltersCompassResultsQuery,
  useLazyGetResearchIssuesQuery,
  useLazyGetResearchZonesQuery,
  useLazyGetOrgTreeQuery
} = API;
