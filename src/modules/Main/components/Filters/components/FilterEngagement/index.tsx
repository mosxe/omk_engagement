import Select from 'components/Select';
import { OptionChange, Option } from 'components/Select/types';
import { FilterName, Filters } from 'types';
import { getFilterOptions, getDefaultValue } from 'helpers';

type Props = {
  data: Filters[];
  dataSelected: any;
  subCode: string;
  onChange: (options: OptionChange, filterName: FilterName) => void;
};

const FilterEngagement = ({ data, dataSelected, subCode, onChange }: Props) => {
  return (
    <>
      <Select
        options={getFilterOptions(data, 'group')}
        defaultValue={getDefaultValue(dataSelected, 'engagement', 'group')}
        onChange={(e) => onChange(e, 'group')}
        placeholder='Группа'
        width={180}
      />
      <Select
        options={getFilterOptions(data, 'subs')}
        defaultValue={getDefaultValue(dataSelected, 'engagement', 'subs')}
        onChange={(e) => onChange(e, 'subs')}
        placeholder='Подразделение/БЕ'
        width={230}
      />
      <Select
        options={getFilterOptions(data, 'city')}
        defaultValue={getDefaultValue(dataSelected, 'engagement', 'city')}
        onChange={(e) => onChange(e, 'city')}
        placeholder='Город'
        width={170}
      />
    </>
  );
};

export default FilterEngagement;
