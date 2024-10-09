import { ReactNode } from 'react';

export type Option = {
  value: string | number;
  label: string;
};
export type OptionType = Option;
export type OptionsType = Array<OptionType>;
export type OptionChange = Option[];
export declare type SingleValue<Option> = Option | null;
export declare type MultiValue<Option> = readonly Option[];
export declare type OnChangeValue<
  Option,
  IsMulti extends boolean
> = IsMulti extends true ? MultiValue<Option> : SingleValue<Option>;

export type SelectProps = {
  options?: OptionsType | any;
  id?: string;
  label?: string;
  placeholder?: string;
  tooltip?: ReactNode;
  onDropdownIndicator?: () => void;
  value?: Array<OptionType>;
  onChange?: (val: any) => void;
  // onChange?: (option: OptionChange) => void;
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
  width?: number;
  isMulti?: boolean;
};

export type optionsMessageProps = {
  inputValue: string;
};
