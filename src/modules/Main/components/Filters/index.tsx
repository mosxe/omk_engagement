import FilterEngagement from './FilterEngagement';
import FilterCompass from './FilterCompass';
import FilterQuestions from './FilterQuestions';
import FilterIssues from './FilterIssues';

export type FilterProps = {
  onApply: () => void;
  onReset: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  isShowCountRespondent?: boolean;
};

export { FilterEngagement, FilterCompass, FilterQuestions, FilterIssues };
