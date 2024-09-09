import QuestionCard from '../QuestionsCard';
import Skeleton from '../QuestionsCard/Skeleton';
import NoData from 'modules/Main/components/NoData';
import { Question } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: Question[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const COUNT_SKELETON = 4;

const Content = ({ data, isLoading, isError }: Props) => {
  if (data === undefined || isLoading) {
    return (
      <div className={styles.questions}>
        {[...Array(COUNT_SKELETON)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data.length || isError) {
    return (
      <div className={`${styles.questions} ${styles.questions_empty}`}>
        <NoData />
      </div>
    );
  }

  return (
    <div className={styles.questions}>
      {data.map((card) => (
        <QuestionCard key={card.id} id={card.id} name={card.name} />
      ))}
    </div>
  );
};

export default Content;
