import { useEffect } from 'react';
import Select from 'components/Select';
import FilterContainer from '../FIlterContainer';
import { OptionChange } from 'components/Select/types';
import { Filter, FilterName } from 'types';
import { FilterProps } from '../index';
import { useGetAllFiltersCompassDataQuery } from 'store/apiSlice';
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
  const { data = initialFiltersCompass, isLoading: isLoadingFilters } =
    useGetAllFiltersCompassDataQuery({ filters: [] });
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.compass
  );

  useEffect(() => {}, []);

  const onChange = async (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateSelectedFilters({ tab: 'compass', data: filterValues }));
  };

  const isLoadingFilter = isLoadingFilters || isLoading;

  return (
    <FilterContainer
      onApply={onApply}
      onReset={onReset}
      isLoading={isLoadingFilter}
      isDisabled={isDisabled}
      data={selectedFilters}
      text='Воспользуйтесь фильтром, чтобы посмотреть подборку материалов'
    >
      <div>
        <Select
          options={getFilterOptions(data.data, 'group')}
          defaultValue={getValueSelect(selectedFilters, 'group')}
          value={getValueSelect(selectedFilters, 'group')}
          onChange={(e) => onChange(e, 'group')}
          placeholder='Группа'
          width={180}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'subs')}
          defaultValue={getValueSelect(selectedFilters, 'subs')}
          value={getValueSelect(selectedFilters, 'subs')}
          onChange={(e) => onChange(e, 'subs')}
          placeholder='Подразделение/БЕ'
          width={230}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'city')}
          defaultValue={getValueSelect(selectedFilters, 'city')}
          value={getValueSelect(selectedFilters, 'city')}
          onChange={(e) => onChange(e, 'city')}
          placeholder='Город'
          width={170}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'category')}
          defaultValue={getValueSelect(selectedFilters, 'category')}
          value={getValueSelect(selectedFilters, 'category')}
          onChange={(e) => onChange(e, 'category')}
          placeholder='Категория'
          width={160}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'sex')}
          defaultValue={getValueSelect(selectedFilters, 'sex')}
          value={getValueSelect(selectedFilters, 'sex')}
          onChange={(e) => onChange(e, 'sex')}
          placeholder='Пол'
          width={100}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'experience')}
          defaultValue={getValueSelect(selectedFilters, 'experience')}
          value={getValueSelect(selectedFilters, 'experience')}
          onChange={(e) => onChange(e, 'experience')}
          placeholder='Стаж работы'
          width={180}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'problems')}
          defaultValue={getValueSelect(selectedFilters, 'problems')}
          value={getValueSelect(selectedFilters, 'problems')}
          onChange={(e) => onChange(e, 'problems')}
          placeholder='Проблема'
          width={340}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'strong_point')}
          defaultValue={getValueSelect(selectedFilters, 'strong_point')}
          value={getValueSelect(selectedFilters, 'strong_point')}
          onChange={(e) => onChange(e, 'strong_point')}
          placeholder='Сильная сторона'
          width={340}
        />
      </div>
    </FilterContainer>
  );
};

export default FilterCompass;
