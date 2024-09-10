import Tab from './components/Tab';
import Questions from './components/Questions';
import Issues from './components/Issues';
import { QuestionsTab } from 'types';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { changeQuestionsTab } from 'store/filterSlice';

type Props = {
  isLoading: boolean;
};

const SectionQuestions = ({ isLoading }: Props) => {
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
      {questionsTab === 'questions' && <Questions isLoading={isLoading} />}
      {questionsTab === 'issues' && <Issues isLoading={isLoading} />}
    </>
  );
};

export default SectionQuestions;
