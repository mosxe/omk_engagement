import FilterEngagement from './FilterEngagement';
import FilterCompass from './FilterCompass';

export type FilterProps = {
  onApply: () => void;
  onReset: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

export { FilterEngagement, FilterCompass };
