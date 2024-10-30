import { useState } from 'react';
import IssuesCard from '../IssuesCard';
import Skeleton from '../IssuesCard/Skeleton';
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
      <section className={styles.issues}>
        <div className={styles.issues__wrapper}>
          {[...Array(COUNT_SKELETON)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (!data.length || isError) {
    return (
      <section className={`${styles.issues} ${styles.issues_empty}`}>
        <NoData text='Данные отсутствуют' />
      </section>
    );
  }

  return (
    <section className={styles.issues}>
      <div className={styles.issues__wrapper}>
        {data.slice(0, count).map((card) => (
          <IssuesCard key={card.id} id={card.id} name={card.name} />
        ))}
      </div>
      {count < data.length && (
        <button
          className={styles.issues__btn}
          type='button'
          onClick={handleClick}
        >
          Показать ещё 10 проблематик
        </button>
      )}
    </section>
  );
};

export default Content;
