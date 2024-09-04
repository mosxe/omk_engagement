import { CommentItem } from 'types';
import Card from './Card';
import styles from './styles.module.scss';

type Props = {
  data: CommentItem[];
};

const Content = ({ data }: Props) => {
  if (!data.length) {
    return (
      <div className={styles['engagement-comments__empty']}>
        Данные отсутствуют
      </div>
    );
  }

  return (
    <div className={styles['engagement-comments__wrapper']}>
      {data.map((card, index) => (
        <Card
          key={index}
          text={card.text}
          person_name={card.person_name}
          position_name={card.position_name}
        />
      ))}
    </div>
  );
};

export default Content;
