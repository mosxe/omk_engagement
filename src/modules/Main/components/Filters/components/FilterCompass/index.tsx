import Select from 'components/Select';
import { OptionChange, Option } from 'components/Select/types';
import { Filters, FilterName } from 'types';
import { filtersState } from 'store/filterSlice';
import { getFilterOptions, getDefaultValue } from 'helpers';

type Props = {
  data: Filters[];
  dataSelected: any;
  subCode: string;
  onChange: (options: OptionChange, filterName: FilterName) => void;
};

const FilterCompass = ({ data, dataSelected, subCode, onChange }: Props) => {
  return (
    <>
      <Select
        options={getFilterOptions(data, 'group')}
        defaultValue={getDefaultValue(dataSelected, 'compass', 'group')}
        onChange={(e) => onChange(e, 'group')}
        placeholder='Группа'
        width={180}
      />
      <Select
        options={getFilterOptions(data, 'subs')}
        defaultValue={getDefaultValue(dataSelected, 'compass', 'subs')}
        onChange={(e) => onChange(e, 'subs')}
        placeholder='Подразделение/БЕ'
        width={230}
      />
      <Select
        options={getFilterOptions(data, 'city')}
        defaultValue={getDefaultValue(dataSelected, 'compass', 'city')}
        onChange={(e) => onChange(e, 'city')}
        placeholder='Город'
        width={170}
      />
      <Select
        options={getFilterOptions(data, 'category')}
        onChange={onChange}
        placeholder='Категория'
        width={160}
      />
      <Select
        options={getFilterOptions(data, 'sex')}
        onChange={onChange}
        placeholder='Пол'
        width={100}
      />
      <Select
        options={getFilterOptions(data, 'experience')}
        onChange={onChange}
        placeholder='Стаж работы'
        width={180}
      />
      <Select
        options={getFilterOptions(data, 'problems')}
        onChange={onChange}
        placeholder='Проблема'
        width={340}
      />
      <Select
        options={getFilterOptions(data, 'problems')}
        onChange={onChange}
        placeholder='Сильная сторона'
        width={340}
      />
    </>
  );
};

export default FilterCompass;
