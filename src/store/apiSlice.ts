import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ResponseFilters,
  FilterParams,
  ResponseSpeedChart,
  ResponseCategoryChart,
  ResponseComments,
  ResponseKeyResults
} from 'types';
import mockData from './mockData.json';
const baseURL = window.location.origin;

// RANDOM в параметрах нужно будет удалить перед билдом на прод!!!!!!
const postUrl = (urlParams: string) => {
  return import.meta.env.DEV
    ? 'https://jsonplaceholder.typicode.com/posts'
    : baseURL +
        '/custom_web_template.html?custom_web_template_id=7029703095570822192' +
        urlParams;
};
const API_URL = import.meta.env.DEV
  ? 'https://jsonplaceholder.typicode.com/posts/1'
  : baseURL +
    '/custom_web_template.html?custom_web_template_id=7029703095570822192';

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
      { filters: FilterParams[]; is_starting: boolean }
    >({
      query: ({ filters, is_starting }) => ({
        url: postUrl('&action=getFilterEngagementData'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          is_starting
        })
      }),
      transformResponse: (response: ResponseFilters, meta, arg) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseFilters = arg.is_starting
            ? (mockData.dataEngagement as ResponseFilters)
            : (mockData.dataUpdateEngagement as ResponseFilters);
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
      transformResponse: (response: ResponseFilters, meta, arg) => {
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
      { filters: FilterParams[]; random: number }
    >({
      query: ({ filters, random }) => ({
        url: postUrl('&action=getSpeedData'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          random
        })
      }),
      transformResponse: (response: ResponseSpeedChart) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseSpeedChart =
            mockData.dataBarChart as ResponseSpeedChart;
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
      { filters: FilterParams[]; random: number }
    >({
      query: ({ filters, random }) => ({
        url: postUrl('&action=getCategoryData'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          random
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
      { filters: FilterParams[]; random: number }
    >({
      query: ({ filters, random }) => ({
        url: postUrl('&action=getKeyResults'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          random
        })
      }),
      transformResponse: (response: ResponseKeyResults) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseKeyResults =
            mockData.dataKeyResults as ResponseKeyResults;
          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 500);
          });
        } else {
          return response;
        }
      }
    }),
    getComments: builder.query<
      ResponseComments,
      { type: 'zone' | 'issue'; is_starting: boolean }
    >({
      query: ({ type, is_starting }) =>
        urlBuilder({
          action: 'getComments',
          type,
          is_starting
        }),
      transformResponse: (response: ResponseComments, meta, arg) => {
        if (import.meta.env.DEV) {
          let data = [];
          if (arg.type === 'zone') {
            data = arg.is_starting
              ? mockData.dataStartCommentsZones.data
              : mockData.dataCommentsZones.data;
          } else {
            data = arg.is_starting
              ? mockData.dataStartCommentsIssues.data
              : mockData.dataCommentsIssues.data;
          }
          const mockDataResponse: ResponseComments = {
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
  useLazyGetKeyResultsQuery
} = API;
