import { CommentItem } from 'types';
import styles from './styles.module.scss';

const Card = ({ text }: CommentItem) => {
  return (
    <div className={styles['engagement-comments__card']}>
      <div className={styles['engagement-comments__card_text']}>{text}</div>
    </div>
  );
};

export default Card;
