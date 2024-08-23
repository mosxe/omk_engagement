import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ResponseFilters,
  FilterParams,
  ResponseSpeedChart,
  ResponseCategoryChart,
  ResponseComments
} from 'types';
import mockData from './mockData.json';
const baseURL = window.location.origin;

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
  refetchOnFocus: true,
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
        // console.log('transformResponse');
        // console.log(arg);
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseFilters = arg.is_starting
            ? (mockData.dataCompass as ResponseFilters)
            : (mockData.dataUpdateCompass as ResponseFilters);
          // console.log(mockDataResponse);
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
            mockData.dataBarChart as ResponseSpeedChart;

          // mockData.dataSpeedChart as ResponseSpeedChart;
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
        url: postUrl('&action=getCategoryData'),
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
    getComments: builder.query<ResponseComments, 'zone' | 'issue'>({
      query: (type) =>
        urlBuilder({
          action: 'getComments',
          type: type
        }),
      transformResponse: (response: ResponseComments, meta, arg) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseComments = {
            data:
              arg === 'zone'
                ? mockData.dataCommentsZones.data
                : mockData.dataCommentsIssues.data,
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
  useLazyGetCommentsQuery
} = API;
