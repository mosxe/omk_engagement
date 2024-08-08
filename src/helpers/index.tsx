import { Filters, FilterName, Tab } from 'types';
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

const getDefaultValue = (
  data: {
    [key in Partial<Tab>]: Filters[];
  },
  tab: Tab,
  filterName: FilterName
) => {
  console.log(data);
  console.log(tab);
  console.log(filterName);

  const selectedFilters = data[tab].find(
    (filter) => filter.name === filterName
  );

  if (selectedFilters !== undefined) {
    return selectedFilters.value;
  }
  return [];
};

export { getLink, getLinkFile, getFilterOptions, getDefaultValue };
