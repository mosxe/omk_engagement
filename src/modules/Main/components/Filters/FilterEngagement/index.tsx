import { useEffect } from 'react';
import Select from 'components/Select';
import FilterContainer from '../FIlterContainer';
import { OptionChange } from 'components/Select/types';
import { FilterName, Filter } from 'types';
import {
  getFilterOptions,
  getDefaultValue,
  transformDataFilters
} from 'helpers';
import { initialFiltersEngagement } from 'store/constants';
import { useLazyGetFilterEngagementDataQuery } from 'store/apiSlice';
import { updateSelectedFilters } from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

type Props = {
  onApply: () => void;
  onReset: () => void;
};

const FilterEngagement = ({ onApply, onReset }: Props) => {
  const [updateFiltersEngagement, { data = initialFiltersEngagement }] =
    useLazyGetFilterEngagementDataQuery();
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );

  useEffect(() => {
    updateFiltersEngagement({ filters: [], is_starting: true });
  }, []);

  const onChange = async (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateSelectedFilters({ tab: 'engagement', data: filterValues }));
    const dataFilters = transformDataFilters(selectedFilters, filterValues);
    // await updateFiltersCompass({
    //   filters: dataFilters,
    //   is_starting: false
    // });
  };

  return (
    <FilterContainer onApply={onApply} onReset={onReset}>
      <Select
        options={getFilterOptions(data.filters, 'group')}
        defaultValue={getDefaultValue(selectedFilters, 'group')}
        onChange={(e) => onChange(e, 'group')}
        placeholder='Группа'
        width={180}
      />
      <Select
        options={getFilterOptions(data.filters, 'subs')}
        defaultValue={getDefaultValue(selectedFilters, 'subs')}
        onChange={(e) => onChange(e, 'subs')}
        placeholder='Подразделение/БЕ'
        width={230}
      />
      <Select
        options={getFilterOptions(data.filters, 'city')}
        defaultValue={getDefaultValue(selectedFilters, 'city')}
        onChange={(e) => onChange(e, 'city')}
        placeholder='Город'
        width={170}
      />
    </FilterContainer>
  );
};

export default FilterEngagement;
