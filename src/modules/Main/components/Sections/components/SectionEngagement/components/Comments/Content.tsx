import { CommentItem } from 'types';
import Skeleton from './Skeleton';
import Card from './Card';
import styles from './styles.module.scss';

type Props = {
  data: CommentItem[] | undefined;
  isLoading: boolean;
};

const Content = ({ data, isLoading }: Props) => {
  if (isLoading || data === undefined) {
    return <Skeleton />;
  }

  if (!data.length) {
    return (
      <div className={styles['engagement-comments__empty']}>
        Данные отсутствуют
      </div>
    );
  }

  return (
    <div className={styles['engagement-comments__wrapper']}>
      {data.map((card) => (
        <Card
          key={card.id}
          text={card.text}
          person_name={card.person_name}
          position_name={card.position_name}
        />
      ))}
    </div>
  );
};

export default Content;
