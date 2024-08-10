﻿import { Filters, FilterName, Tab } from 'types';
import { filtersState } from 'store/filterSlice';

const getLink = (link: string) => {
  if (link.startsWith('https://') || link.startsWith('http://')) {
    return link;
  }
  return window.origin + link;
};

const getLinkFile = (link: string) => {
  if (link.startsWith('https://') || link.startsWith('http://')) {
    return link;
  }
  const tempLink = link.startsWith('/') ? link : '/' + link;
  return window.origin + tempLink;
};

const getFilterOptions = (data: Filters[], filterName: FilterName) => {
  const options = data.find((filter) => filter.name === filterName);
  return options !== undefined ? options.value : [];
};

const getDefaultValue = (data: Filters[], filterName: FilterName) => {
  const selectedFilters = data.find((filter) => filter.name === filterName);

  if (selectedFilters !== undefined) {
    return selectedFilters.value;
  }
  return [];
};

const transformDataFilters = (
  dataFilters: Filters[],
  currentFilter?: Filters
) => {
  const transformData = dataFilters.map((filter) => {
    const data = {
      name: filter.name,
      value: [] as string[] | number[]
    };

    if (currentFilter !== undefined && filter.name === currentFilter.name) {
      const currentData = currentFilter.value.map((val) => val.value);
      data.value = currentData;
    } else {
      data.value = filter.value.map((val) => val.value);
    }
    return data;
  });
  return transformData;
};

export {
  getLink,
  getLinkFile,
  getFilterOptions,
  getDefaultValue,
  transformDataFilters
};
