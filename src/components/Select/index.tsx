import ReactSelect, { components, OptionProps } from 'react-select';
import Checkbox from './Checkbox';
import styles from './styles.module.scss';
import { Option, SelectProps } from './types';

const getTextLoading = () => <span>Загрузка данных...</span>;

const Select = (props: SelectProps): JSX.Element => {
  const {
    id,
    options,
    placeholder,
    onChange,
    noOptionsMessage = 'Данные отсутствуют',
    noOptionsMessageDefault = 'Не найдено',
    value,
    isDisabled = false,
    defaultValue = [],
    innerRef = undefined
  } = props;

  const OptionSelect = (props: OptionProps<Option>) => {
    return (
      <components.Option {...props}>
        <Checkbox label={props.label} checked={props.isSelected} />
      </components.Option>
    );
  };

  const MultiValueLabel = (props: any) => {
    const indexArray =
      props.selectProps.value === null
        ? 0
        : props.selectProps.value.findIndex(
            (item: Option) => item.value === props.data.value
          );

    const tempValue =
      props.selectProps.value !== null &&
      props.selectProps.value.length > 1 &&
      props.selectProps.value.length - 1 !== indexArray
        ? props.data.label + ', '
        : props.data.label;

    return (
      <components.MultiValueLabel {...props}>
        <div className='root'>{tempValue}</div>
      </components.MultiValueLabel>
    );
  };

  return (
    <ReactSelect
      id={id}
      options={options}
      ref={innerRef}
      name={id}
      isMulti={true}
      menuPlacement='auto'
      isClearable={false}
      isSearchable={false}
      closeMenuOnSelect={false}
      defaultValue={defaultValue}
      hideSelectedOptions={false}
      noOptionsMessage={({ inputValue }) =>
        !inputValue ? noOptionsMessage : noOptionsMessageDefault
      }
      placeholder={placeholder}
      components={{ Option: OptionSelect, MultiValueLabel }}
      classNames={{
        control: ({ menuIsOpen }) =>
          menuIsOpen
            ? `${styles.select__container} ${styles.select__container_focus}`
            : isDisabled
            ? `${styles.select__container} ${styles.disabled}`
            : styles.select__container,
        dropdownIndicator: () => styles.select__arrow,
        indicatorSeparator: () => styles.select__separator,
        valueContainer: () => styles.select__value,
        menu: () => styles.select__menu,
        placeholder: () => styles.select__placeholder,
        option: () => styles.select__option,
        singleValue: () => styles['single-value'],
        multiValue: () => styles['select__multi-value'],
        multiValueLabel: () => styles['select__multi-label']
      }}
      styles={{
        multiValueRemove: (base) => ({ ...base, display: 'none' })
        // control: (base) => ({ ...base, width: width ? width : '100%' })
      }}
      value={value}
      onChange={onChange}
      loadingMessage={getTextLoading}
      isDisabled={isDisabled}
    />
  );
};

export default Select;
