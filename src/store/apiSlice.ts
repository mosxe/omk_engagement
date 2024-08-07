import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseFilters } from 'types';
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
    getData: builder.query<ResponseFilters, void>({
      query: (id) => ({
        url: postUrl('&action=getWorkerFilter'),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
        // body: JSON.stringify({
        //   id
        // })
      }),
      transformResponse: (response: ResponseFilters) => {
        if (import.meta.env.DEV) {
          const mockDataResponse: ResponseFilters =
            mockData.data as ResponseFilters;

          return new Promise((resolve) => {
            return setTimeout(() => resolve(mockDataResponse), 1500);
          });
        } else {
          return response;
        }
      }
    })
    // getMaterial: builder.query<IResponseMaterial, string | undefined>({
    //   query: (id) =>
    //     urlBuilder({
    //       action: 'getMaterial',
    //       id: id
    //     }),
    //   transformResponse: (response: IResponseMaterial) => {
    //     if (import.meta.env.DEV) {
    //       const mockDataResponse: IResponseMaterial = {
    //         data: mockData.material.data as IMaterial,
    //         assessment: mockData.material.assessment as IAssessment,
    //         role: mockData.material.role as Role,
    //         isError: false,
    //         errorMessage: ''
    //       };
    //       return new Promise((resolve) => {
    //         return setTimeout(() => resolve(mockDataResponse), 1500);
    //       });
    //     } else {
    //       return response;
    //     }
    //   }
    // }),
    // updateStatusMaterial: builder.query<void, string>({
    //   query: (id) => ({
    //     url: API_URL + '&action=updateStatusMaterial',
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       id
    //     })
    //   })
    // }),
    // activeAssessment: builder.query<IResponseActiveAssessment, string>({
    //   query: (assessment_id: string) => ({
    //     url: API_URL + '&action=activeAssessment',
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       assessment_id
    //     })
    //   })
    // })
  })
});

export const {
  useGetDataQuery
  // useLazyGetDataQuery,
  // useGetMaterialQuery,
  // useLazyGetMaterialQuery,
  // useLazyUpdateStatusMaterialQuery,
  // useLazyActiveAssessmentQuery
} = API;
