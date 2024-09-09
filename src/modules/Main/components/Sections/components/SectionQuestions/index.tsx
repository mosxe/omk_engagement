import Tab from './components/Tab';
import Questions from './components/Questions';
import Issues from './components/Issues';
import { QuestionsTab } from 'types';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { changeQuestionsTab } from 'store/filterSlice';
import { OrgTree } from 'types';

type Props = {
  dataOrg: OrgTree[] | undefined;
  isLoading: boolean;
};

const SectionQuestions = ({ dataOrg, isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const questionsTab = useAppSelector((state) => state.filters.questionsTab);

  const handleClick = (value: QuestionsTab) => {
    if (value !== questionsTab) {
      dispatch(changeQuestionsTab(value));
    }
  };
  return (
    <>
      <Tab tab={questionsTab} onClick={handleClick} />
      {questionsTab === 'questions' && (
        <Questions dataOrg={dataOrg} isLoading={isLoading} />
      )}
      {questionsTab === 'issues' && (
        <Issues dataOrg={dataOrg} isLoading={isLoading} />
      )}
    </>
  );
};

export default SectionQuestions;
