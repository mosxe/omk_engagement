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
  if (data === undefined || isLoading) {
    return (
      <div className={styles.issues}>
        {[...Array(COUNT_SKELETON)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data.length || isError) {
    return (
      <div className={`${styles.issues} ${styles.issues_empty}`}>
        <NoData />
      </div>
    );
  }

  return (
    <div className={styles.issues}>
      {data.map((card) => (
        <IssuesCard key={card.id} id={card.id} name={card.name} />
      ))}
    </div>
  );
};

export default Content;
