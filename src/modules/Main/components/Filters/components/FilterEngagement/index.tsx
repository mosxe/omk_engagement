import { useEffect } from 'react';
import Select from 'components/Select';
import { OptionChange, Option } from 'components/Select/types';
import { FilterName, Filters } from 'types';
import { getFilterOptions, getDefaultValue } from 'helpers';
// import { initialFilters } from 'store/constants';
import { useGetFilterEngagementDataQuery } from 'store/apiSlice';

type Props = {
  data: Filters[];
  dataSelected: any;
  onChange: (options: OptionChange, filterName: FilterName) => void;
};

const FilterEngagement = ({ data, dataSelected, onChange }: Props) => {
  console.log('FilterEngagement');
  // const {
  //   data: dataFilters = initialFilters,
  //   isLoading,
  //   isError
  // } = useGetFilterEngagementDataQuery({ filters: [], is_starting: true });
  // console.log(dataFilters);

  // const [updateFiltersEngagement, { data: dataFILL }] =
  //   useLazyGetFilterEngagementDataQuery();

  return (
    <>
      <Select
        options={getFilterOptions(data, 'group')}
        defaultValue={getDefaultValue(dataSelected, 'group')}
        onChange={(e) => onChange(e, 'group')}
        placeholder='Группа'
        width={180}
      />
      <Select
        options={getFilterOptions(data, 'subs')}
        defaultValue={getDefaultValue(dataSelected, 'subs')}
        onChange={(e) => onChange(e, 'subs')}
        placeholder='Подразделение/БЕ'
        width={230}
      />
      <Select
        options={getFilterOptions(data, 'city')}
        defaultValue={getDefaultValue(dataSelected, 'city')}
        onChange={(e) => onChange(e, 'city')}
        placeholder='Город'
        width={170}
      />
    </>
  );
};

export default FilterEngagement;
