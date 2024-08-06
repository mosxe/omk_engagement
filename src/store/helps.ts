import { Tags, IDataItem } from 'types';

export const filteringDataTags = (data: IDataItem[], tags: Tags) => {
  return data.filter(
    (item) => item.tags.filter((tag) => tags.indexOf(tag) >= 0).length
  );
};
