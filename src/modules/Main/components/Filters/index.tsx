import FilterEngagement from './FilterEngagement';
import FilterCompass from './FilterCompass';
import FilterQuestions from './FilterQuestions';
import FilterIssues from './FilterIssues';
import { OrgTree } from 'types/index';

export type FilterProps = {
  dataOrg: OrgTree[] | undefined;
  onApply: () => void;
  onReset: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

export { FilterEngagement, FilterCompass, FilterQuestions, FilterIssues };
