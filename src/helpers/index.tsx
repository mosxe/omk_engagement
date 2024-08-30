import { Filters, FilterName } from 'types';

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

const getValueSelect = (data: Filters[], filterName: FilterName) => {
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

const declinationComments = (value: number) => {
  const words = ['комментарий', 'комментария', 'комментариев'];
  const cases = [2, 0, 1, 1, 1, 2];
  const indexValue = value % 10 < 5 ? value % 10 : 5;

  return words[value % 100 > 4 && value % 100 < 20 ? 2 : cases[indexValue]];
};

const isDisabledBtn = (data: Filters[]) => {
  const hasValue = !data.some((filter) => filter.value.length > 0);
  return hasValue;
};

export {
  getLink,
  getLinkFile,
  getFilterOptions,
  getValueSelect,
  transformDataFilters,
  declinationComments,
  isDisabledBtn
};
