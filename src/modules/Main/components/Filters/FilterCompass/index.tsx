import { useEffect } from 'react';
import Select from 'components/Select';
import FilterContainer from '../FIlterContainer';
import { OptionChange } from 'components/Select/types';
import { Filters, Filter, FilterName } from 'types';
import { useLazyGetFilterCompassDataQuery } from 'store/apiSlice';
import { initialFiltersCompass } from 'store/constants';
import {
  getFilterOptions,
  getValueSelect,
  transformDataFilters
} from 'helpers';
import { updateSelectedFilters } from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

type Props = {
  onApply: () => void;
  onReset: () => void;
};

const FilterCompass = ({ onApply, onReset }: Props) => {
  const [updateFiltersCompass, { data = initialFiltersCompass }] =
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
        defaultValue={getValueSelect(selectedFilters, 'group')}
        onChange={(e) => onChange(e, 'group')}
        placeholder='Группа'
        width={180}
      />
      <Select
        options={getFilterOptions(data.filters, 'subs')}
        defaultValue={getValueSelect(selectedFilters, 'subs')}
        onChange={(e) => onChange(e, 'subs')}
        placeholder='Подразделение/БЕ'
        width={230}
      />
      <Select
        options={getFilterOptions(data.filters, 'city')}
        defaultValue={getValueSelect(selectedFilters, 'city')}
        onChange={(e) => onChange(e, 'city')}
        placeholder='Город'
        width={170}
      />
      <Select
        options={getFilterOptions(data.filters, 'category')}
        defaultValue={getValueSelect(selectedFilters, 'category')}
        onChange={(e) => onChange(e, 'category')}
        placeholder='Категория'
        width={160}
      />
      <Select
        options={getFilterOptions(data.filters, 'sex')}
        defaultValue={getValueSelect(selectedFilters, 'sex')}
        onChange={(e) => onChange(e, 'sex')}
        placeholder='Пол'
        width={100}
      />
      <Select
        options={getFilterOptions(data.filters, 'experience')}
        defaultValue={getValueSelect(selectedFilters, 'experience')}
        onChange={(e) => onChange(e, 'experience')}
        placeholder='Стаж работы'
        width={180}
      />
      <Select
        options={getFilterOptions(data.filters, 'problems')}
        defaultValue={getValueSelect(selectedFilters, 'problems')}
        onChange={(e) => onChange(e, 'problems')}
        placeholder='Проблема'
        width={340}
      />
      <Select
        options={getFilterOptions(data.filters, 'strong_point')}
        defaultValue={getValueSelect(selectedFilters, 'strong_point')}
        onChange={(e) => onChange(e, 'strong_point')}
        placeholder='Сильная сторона'
        width={340}
      />
    </FilterContainer>
  );
};

export default FilterCompass;
