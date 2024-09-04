import { useEffect } from 'react';
import Select from 'components/Select';
import FilterContainer from '../FIlterContainer';
import { OptionChange } from 'components/Select/types';
import { Filter, FilterName } from 'types';
import { FilterProps } from '../index';
import { useLazyGetFilterCompassDataQuery } from 'store/apiSlice';
import { initialFiltersCompass } from 'store/constants';
import {
  getFilterOptions,
  getValueSelect
  // transformDataFilters
} from 'helpers';
import { updateSelectedFilters } from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

const FilterCompass = ({
  onApply,
  onReset,
  isLoading,
  isDisabled
}: FilterProps) => {
  const [updateFiltersCompass, { data = initialFiltersCompass, isFetching }] =
    useLazyGetFilterCompassDataQuery();
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.compass
  );

  useEffect(() => {
    updateFiltersCompass({ filters: [], is_starting: true });
  }, []);

  const onChange = async (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateSelectedFilters({ tab: 'compass', data: filterValues }));
    // const dataFilters = transformDataFilters(selectedFilters, filterValues);
  };

  const isLoadingFilter = isFetching || isLoading;

  return (
    <FilterContainer
      onApply={onApply}
      onReset={onReset}
      isLoading={isLoadingFilter}
      isDisabled={isDisabled}
      data={selectedFilters}
      text='Воспользуйтесь фильтром, чтобы посмотреть подборку материалов'
    >
      <Select
        options={getFilterOptions(data.data, 'group')}
        defaultValue={getValueSelect(selectedFilters, 'group')}
        onChange={(e) => onChange(e, 'group')}
        placeholder='Группа'
        width={180}
      />
      <Select
        options={getFilterOptions(data.data, 'subs')}
        defaultValue={getValueSelect(selectedFilters, 'subs')}
        onChange={(e) => onChange(e, 'subs')}
        placeholder='Подразделение/БЕ'
        width={230}
      />
      <Select
        options={getFilterOptions(data.data, 'city')}
        defaultValue={getValueSelect(selectedFilters, 'city')}
        onChange={(e) => onChange(e, 'city')}
        placeholder='Город'
        width={170}
      />
      <Select
        options={getFilterOptions(data.data, 'category')}
        defaultValue={getValueSelect(selectedFilters, 'category')}
        onChange={(e) => onChange(e, 'category')}
        placeholder='Категория'
        width={160}
      />
      <Select
        options={getFilterOptions(data.data, 'sex')}
        defaultValue={getValueSelect(selectedFilters, 'sex')}
        onChange={(e) => onChange(e, 'sex')}
        placeholder='Пол'
        width={100}
      />
      <Select
        options={getFilterOptions(data.data, 'experience')}
        defaultValue={getValueSelect(selectedFilters, 'experience')}
        onChange={(e) => onChange(e, 'experience')}
        placeholder='Стаж работы'
        width={180}
      />
      <Select
        options={getFilterOptions(data.data, 'problems')}
        defaultValue={getValueSelect(selectedFilters, 'problems')}
        onChange={(e) => onChange(e, 'problems')}
        placeholder='Проблема'
        width={340}
      />
      <Select
        options={getFilterOptions(data.data, 'strong_point')}
        defaultValue={getValueSelect(selectedFilters, 'strong_point')}
        onChange={(e) => onChange(e, 'strong_point')}
        placeholder='Сильная сторона'
        width={340}
      />
    </FilterContainer>
  );
};

export default FilterCompass;
