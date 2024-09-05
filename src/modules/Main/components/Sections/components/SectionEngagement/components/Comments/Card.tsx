import { CommentItem } from 'types';
import styles from './styles.module.scss';

const Card = ({ text, person_name, position_name }: CommentItem) => {
  return (
    <div className={styles['engagement-comments__card']}>
      <div className={styles['engagement-comments__card_text']}>{text}</div>
      <div className={styles['engagement-comments__card_name']}>
        {person_name}
      </div>
      <div className={styles['engagement-comments__card_position']}>
        {position_name}
      </div>
    </div>
  );
};

export default Card;
