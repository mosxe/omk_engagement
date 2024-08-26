import { useEffect } from 'react';
import Select from 'components/Select';
import FilterContainer from '../FIlterContainer';
import { OptionChange } from 'components/Select/types';
import { FilterName, Filter } from 'types';
import {
  getFilterOptions,
  getValueSelect,
  transformDataFilters
} from 'helpers';
import { initialFiltersEngagement } from 'store/constants';
import { useLazyGetFilterEngagementDataQuery } from 'store/apiSlice';
import { updateSelectedFilters } from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

type Props = {
  onApply: () => void;
  onReset: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

const FilterEngagement = ({
  onApply,
  onReset,
  isLoading,
  isDisabled
}: Props) => {
  const [
    updateFiltersEngagement,
    { data = initialFiltersEngagement, isFetching }
  ] = useLazyGetFilterEngagementDataQuery();
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
    await updateFiltersEngagement({
      filters: dataFilters,
      is_starting: false
    });
  };

  const isLoadingFilter = isFetching || isLoading;

  return (
    <FilterContainer
      onApply={onApply}
      onReset={onReset}
      isLoading={isLoadingFilter}
      isDisabled={isDisabled}
      data={selectedFilters}
    >
      <Select
        options={getFilterOptions(data.filters, 'group')}
        defaultValue={getValueSelect(selectedFilters, 'group')}
        onChange={(e) => onChange(e, 'group')}
        value={getValueSelect(selectedFilters, 'group')}
        placeholder='Группа'
        width={180}
        isDisabled={isLoadingFilter}
      />
      <Select
        options={getFilterOptions(data.filters, 'subs')}
        defaultValue={getValueSelect(selectedFilters, 'subs')}
        onChange={(e) => onChange(e, 'subs')}
        value={getValueSelect(selectedFilters, 'subs')}
        placeholder='Подразделение/БЕ'
        width={230}
        isDisabled={isLoadingFilter}
      />
      <Select
        options={getFilterOptions(data.filters, 'city')}
        defaultValue={getValueSelect(selectedFilters, 'city')}
        onChange={(e) => onChange(e, 'city')}
        value={getValueSelect(selectedFilters, 'city')}
        placeholder='Город'
        width={170}
        isDisabled={isLoadingFilter}
      />
    </FilterContainer>
  );
};

export default FilterEngagement;
