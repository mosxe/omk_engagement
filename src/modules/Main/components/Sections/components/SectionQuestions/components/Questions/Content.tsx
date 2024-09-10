import { useState } from 'react';
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
  const [count, setCount] = useState<number>(10);

  const handleClick = () => {
    setCount((prevValue) => prevValue + 10);
  };

  if (data === undefined || isLoading) {
    return (
      <section className={styles.questions}>
        {[...Array(COUNT_SKELETON)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </section>
    );
  }

  if (!data.length || isError) {
    return (
      <section className={`${styles.questions} ${styles.questions_empty}`}>
        <NoData />
      </section>
    );
  }

  return (
    <section className={styles.questions}>
      <div className={styles.questions__wrapper}>
        {data.slice(0, count).map((card) => (
          <QuestionCard key={card.id} id={card.id} name={card.name} />
        ))}
      </div>
      {count < data.length && (
        <button
          className={styles.questions__btn}
          type='button'
          onClick={handleClick}
        >
          Показать ещё 10 вопросов
        </button>
      )}
    </section>
  );
};

export default Content;
