import ReactSelect, {
  components,
  DropdownIndicatorProps,
  OptionProps,
  MultiValueGenericProps
} from 'react-select';
import Loader from './Loader';
// import Checkbox from './Checkbox';
import styles from './styles.module.scss';
import {
  OptionType,
  Option,
  OptionsType,
  SelectProps,
  formatOptionLabel
} from './types';

const Select = (props: SelectProps): JSX.Element => {
  const {
    id,
    options,
    placeholder,
    label,
    onChange,
    noOptionsMessage = 'Данные отсутствуют',
    noOptionsMessageDefault = 'Не найдено',
    isLoading = false,
    value,
    isDisabled = false,
    defaultValue = [],
    isClearable = false,
    innerRef = undefined,
    isArrow = true,
    isTextCenter = false
  } = props;

  const DropdownIndicator = (
    props: DropdownIndicatorProps<OptionType, true>
  ) => {
    if (isLoading) {
      return (
        <components.DropdownIndicator {...props}>
          <Loader />
        </components.DropdownIndicator>
      );
    }

    if (isDisabled || !isArrow) {
      return null;
    }

    return (
      <components.DropdownIndicator {...props}></components.DropdownIndicator>
    );
  };

  const Option = (props: OptionProps) => {
    return (
      <components.Option {...props}>
        <div className={styles['checkbox']}>
          <input
            type='checkbox'
            checked={props.isSelected}
            onChange={props.selectOption}
          />
          <span className={styles['checkbox__value']}>
            <svg
              width='12'
              height='10'
              viewBox='0 0 12 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.99993 7.80007L1.19993 5.00006L0.266602 5.9334L3.99993 9.66673L11.9999 1.66673L11.0666 0.733398L3.99993 7.80007Z'
                fill='white'
              />
            </svg>
          </span>
          <div className={styles['checkbox__text']}>
            <span>{props.label}</span>
          </div>
        </div>
      </components.Option>
    );
  };

  const formatOptionLabel = (
    option: Option,
    { context, selectValue }: formatOptionLabel
  ) => {
    console.log(option);
    console.log(selectValue);
    console.log(context);
    if (selectValue.length > 1) {
      let tempValue = '';
      selectValue.forEach((option, index) => {
        if (index === 0) {
          tempValue += option.label;
        } else {
          tempValue += ',' + option.label;
        }
      });
      return tempValue;
    }
    return option.label;
  };

  const MultiValueLabel = (props: MultiValueGenericProps<any>) => {
    console.log(props);
    const indexArray =
      props.selectProps.value === null
        ? 0
        : props.selectProps.value.findIndex(
            (item: Option) => item.value === props.data.value
          );

    const tempValue =
      props.selectProps.value !== null &&
      props.selectProps.value.length > 1 &&
      indexArray > 0
        ? ', ' + props.data.label
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
      options={[
        { value: 3, label: '3' },
        { value: 2, label: '2' },
        { value: 2222, label: '2222' }
      ]}
      ref={innerRef}
      name={id}
      isMulti={true}
      // formatOptionLabel={formatOptionLabel}
      menuPlacement='auto'
      isClearable={false}
      isSearchable={false}
      closeMenuOnSelect={false}
      defaultValue={defaultValue}
      hideSelectedOptions={false}
      noOptionsMessage={({ inputValue }) =>
        isLoading
          ? 'Загрузка данных...'
          : !inputValue
          ? noOptionsMessage
          : noOptionsMessageDefault
      }
      placeholder={placeholder}
      components={{ DropdownIndicator, Option, MultiValueLabel }}
      classNames={{
        control: ({ isDisabled, menuIsOpen }) =>
          menuIsOpen
            ? `${styles.select__container} ${styles.select__container_focus}`
            : isDisabled
            ? `${styles.select__container} ${styles.disabled}`
            : styles.select__container,
        dropdownIndicator: () => styles.select__arrow,
        indicatorSeparator: () => styles.select__separator,
        valueContainer: () =>
          isTextCenter
            ? `${styles.select__value} ${styles.select__value_center}`
            : styles.select__value,
        menu: () => styles.select__menu,
        placeholder: () => styles.select__placeholder,
        option: () =>
          isTextCenter
            ? `${styles.select__option} ${styles.select__option_center}`
            : styles.select__option,
        singleValue: () => styles['single-value'],
        multiValue: () => styles['select__multi-value'],
        multiValueLabel: () => styles['select__multi-label']
      }}
      styles={{
        multiValueRemove: (base) => ({ ...base, display: 'none' })
      }}
      value={value}
      onChange={onChange}
      loadingMessage={() => <span>Загрузка данных...</span>}
      isDisabled={isDisabled}
    />
  );
};

export default Select;
