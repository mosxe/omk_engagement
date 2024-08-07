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

const getDefaultValue = (data: Filters[], subCode: string) => {
  const options = data.find((filter) => filter.name === 'subs');
  if (options !== undefined) {
    const defaultValue = options.value.find((val) => val.value === subCode);
    return defaultValue !== undefined ? defaultValue : [];
  }
  return [];
};

export { getLink, getLinkFile, getFilterOptions, getDefaultValue };
