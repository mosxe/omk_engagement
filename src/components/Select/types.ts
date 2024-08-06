import { ReactNode } from 'react';

export type Option = {
  value: string | number;
  label: string;
};
export type OptionType = Option;
export type OptionsType = Array<OptionType>;
export type OptionChange = OptionType | OptionType[] | readonly OptionType[];

export type SelectProps = {
  options?: OptionsType | any;
  id?: string;
  label?: string;
  placeholder?: string;
  tooltip?: ReactNode;
  onDropdownIndicator?: () => void;
  value?: Array<OptionType>;
  onChange?: (value: OptionChange) => void;
  noOptionsMessage?: string;
  noOptionsMessageDefault?: string;
  isLoading?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  defaultValue?: OptionType | OptionsType;
  onFocus?: () => void;
  isClearable?: boolean;
  isArrow?: boolean;
  innerRef?: any;
  isTextCenter?: boolean;
};

export type optionsMessageProps = {
  inputValue: string;
};

export type formatOptionLabel = {
  context: string;
  inputValue: string;
  selectValue: Option[];
};
